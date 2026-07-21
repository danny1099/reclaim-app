import { NextIntlClientProvider, useMessages } from "next-intl";

interface I18nProviderProps {
  children: React.ReactNode;
}

export const I18nProvider = ({ children }: I18nProviderProps) => {
  const messages = useMessages();
  return <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>;
};
