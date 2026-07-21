"use client";
import { Toaster as SileoToaster } from "sileo";
import { useSystemTheme } from "@/shared/hooks";

type ToasterProps = React.ComponentProps<typeof SileoToaster>;

export const Toaster = ({ ...props }: ToasterProps) => {
  const { theme } = useSystemTheme();
  const fillColor = theme === "dark" ? "#171717" : "#f4f4f5";

  return (
    <SileoToaster
      {...props}
      theme={theme as ToasterProps["theme"]}
      position="top-center"
      options={{
        duration: 5000,
        roundness: 16,
        fill: "#171717",
        styles: {
          title: "text-xs! font-semibold!",
          description: "text-2xs! font-normal! text-white/80!",
        },
      }}
    />
  );
};
