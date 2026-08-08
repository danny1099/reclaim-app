interface BuildPromptProps {
  subscriber: string;
  brandName: string;
  brandVoice?: string;
  locale?: string;
}

export const buildPrompt = ({ subscriber, brandName, brandVoice, locale = "es" }: BuildPromptProps) => {
  return `
    You are an assistant that writes emails on behalf of content creators.

    CREATOR CONTEXT:
    Business/Community name: ${brandName}
    Brand tone/voice: ${brandVoice || "empathetic and friendly"}
    Subscriber name: ${subscriber}

    TASK:
    Write 3 email versions to recover a failed subscription payment with maximum 120 words.

    DAY 1 EMAIL — Informative, not alarming:
     - Tone: friendly, implies it could be a bank error
     - Objective: inform about the issue and offer a solution
     
    DAY 3 EMAIL — More direct:
     - Tone: empathetic but clear, shows you value their membership
     - Objective: urge to update the card before losing access
     
    DAY 7 EMAIL — Final notice:
     - Tone: respectful but urgent, without being aggressive
     - Objective: warn that access will be suspended if not resolved
    
    MANDATORY RULES:
      - write in the language equivalent to the locale: ${locale} 
      - Use {{UPDATE_CARD_LINK}} as the exact placeholder for the update link
      - Sound as if the creator themselves wrote it, not an automated system
      - Do not mention specific amounts
      - Do not use words like "rejected card" or "non-payment" — use "payment issue"

    Respond ONLY with valid JSON, no backticks, no additional text:
     {
      "day1": { "subject": "...", "body": "..." },
      "day3": { "subject": "...", "body": "..." },
      "day7": { "subject": "...", "body": "..." }
     }
  `.trim();
};
