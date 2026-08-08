import { getLocale } from "next-intl/server";
import { task, logger } from "@trigger.dev/sdk/v3";
import { generateEmailContent } from "@/lib/ia/model";
import { buildPrompt } from "@/lib/ia/promps";
import { trpc } from "@/trpc/server";
import { validateCopies } from "@/modules/connection/utils";
import type { EmailVariant, GeneratedCopies } from "@/modules/connection/types";

export const generateEmailCopies = task({
  id: "generate-email-copies",
  maxDuration: 60,
  retry: {
    maxAttempts: 3,
    minTimeoutInMs: 3_000,
    maxTimeoutInMs: 15_000,
    factor: 2,
  },
  run: async (payload: { sequenceId: string }) => {
    const { sequenceId } = payload;
    const locale = await getLocale();

    /* fetch the sequence data with brand and subscriber information */
    const { data, error } = await trpc.connection.getSequenceById({ param: sequenceId });
    if (error || !data) {
      return {
        data: null,
        status: "error",
        message: error?.message || "Error fetching sequence data",
        code: 500,
        skipped: true,
      };
    }

    /* create email prompts with the fetched data */
    const prompt = buildPrompt({
      subscriber: data.subscriber.name,
      brandName: data.brand.name,
      brandVoice: data.brand.brandVoice || undefined,
      locale: locale,
    });

    const emailCopysGenerate = await generateEmailContent(prompt);
    let copies: GeneratedCopies;

    try {
      const clean = emailCopysGenerate
        .replace(/^```json\s*/i, "")
        .replace(/```\s*$/i, "")
        .trim();

      copies = JSON.parse(clean) as GeneratedCopies;
    } catch {
      logger.error("Error on response", { raw: emailCopysGenerate });
      throw new Error("Response format is not valid");
    }

    validateCopies(copies);
    const variants: Array<{ dayVariant: number; variant: EmailVariant }> = [
      { dayVariant: 1, variant: copies.day1 },
      { dayVariant: 3, variant: copies.day3 },
      { dayVariant: 7, variant: copies.day7 },
    ];

    await trpc.connection.createEmailCopies({
      sequenceId,
      variants,
    });

    return {
      generated: 3,
      message: "Copies of generated and saved emails",
    };
  },
});
