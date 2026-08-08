import type Stripe from "stripe";
import { headers } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
import { env } from "@/config/env";
import { stripePlatform } from "@/lib/payments/stripe";
import { redis } from "@/lib/db/redis";
import { trpc } from "@/trpc/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const relevantEvents = new Set(["invoice.payment_failed", "invoice.paid"]);

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = (await headers()).get("stripe-signature");
  const webhookSecret = env.STRIPE_CONNECT_WEBHOOK_SECRET;
  let event: Stripe.Event;

  try {
    if (!signature || !webhookSecret) {
      return NextResponse.json(
        {
          message: "Missing Stripe webhook secret",
          received: false,
        },
        { status: 400 }
      );
    }

    /* construct event from Stripe payload and secret */
    event = stripePlatform.webhooks.constructEvent(body, signature as string, webhookSecret);
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 400 });
  }

  if (event.account) {
    const idempotencyKey = `stripe:event:${event.id}`;
    const wasSet = await redis.set(idempotencyKey, "1", {
      ex: 60 * 60 * 24 * 7,
      nx: true,
    });

    if (wasSet === null) {
      return NextResponse.json(
        {
          received: true,
          duplicate: true,
          message: "Duplicate event received",
        },
        { status: 200 }
      );
    }

    if (relevantEvents.has(event.type)) {
      switch (event.type) {
        case "invoice.payment_failed":
          await trpc.connection.stripePaymentFailed(event);
          break;
        case "invoice.paid":
          await trpc.connection.stripePaymentSucceeded(event);
          break;
      }

      await redis.del(idempotencyKey);
      return NextResponse.json({ error: "Internal processing error" }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true }, { status: 200 });
}
