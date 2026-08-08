import { task, wait } from "@trigger.dev/sdk/v3";
import { generateEmailCopies } from "@/modules/connection/jobs/emails";

export const startRecoverySequence = task({
  id: "start-recovery-sequence",
  description: "Starts a recovery sequence for a failed payment",
  maxDuration: 300,
  retry: { maxAttempts: 1 },
  run: async (payload: { sequenceId: string }) => {
    const { sequenceId } = payload;

    /* Step 1: Generate the 3 email copies with AI */
    await generateEmailCopies.triggerAndWait({ sequenceId });
  },
});
