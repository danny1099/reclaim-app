import { sileo } from "sileo";
import { I18nMessage, useTranslations } from "next-intl";

type ToastType = "success" | "error" | "warning" | "info" | "action" | "loading";

interface ToastProps {
  message: I18nMessage;
  type: ToastType;
  details?: string;
}

export const useToast = () => {
  const t = useTranslations("messages");

  /* all messages toast has a title and description in i18n file */
  const toast = ({ message, type, details }: ToastProps) => {
    const title = t(`${message}.title`);
    const content = t(`${message}.content`);
    return sileo.show({
      title: title,
      description: (
        <div className="flex w-fit flex-col">
          <span>{content}</span>
          {details && <span className="text-muted-foreground text-3xs">{details}</span>}
        </div>
      ),
      autopilot: true,
      type,
    });
  };

  return toast;
};
