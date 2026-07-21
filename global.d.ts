import { I18nMessage } from "next-intl";

declare global {
  interface Children {
    children: React.ReactNode;
  }

  interface APIResult<T> {
    data: T | null;
    code: number;
    message: I18nMessage | null;
    status: "success" | "error";
    messageError?: string | null;
    error?: Error | null;
  }
}

export {};
