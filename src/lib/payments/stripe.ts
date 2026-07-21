import Stripe from "stripe";
import { env } from "@/config/env";

export const stripePlatform = new Stripe(env.STRIPE_SECRET_KEY);
