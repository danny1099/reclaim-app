import OpenAI from "openai";
import { env } from "@/config/env";

const openai = new OpenAI({
  apiKey: env.IA_MODEL_API_KEY,
  baseURL: "https://integrate.api.nvidia.com/v1",
});

export const IA_MODEL = "openai/gpt-oss-120b" as const;

export const generateEmailContent = async (prompt: string) => {
  const response = await openai.chat.completions.create({
    model: IA_MODEL,
    messages: [{ content: prompt, role: "user" }],
    temperature: 1,
    top_p: 1,
    max_tokens: 4096,
    stream: true,
  });

  let result = "";

  for await (const chunk of response) {
    const reasoning = chunk.choices[0]?.delta.content?.match(/Reasoning: (.*)/)?.[1];
    if (reasoning) process.stdout.write(reasoning);
    result += chunk.choices[0]?.delta?.content || "";
  }
  return result;
};
