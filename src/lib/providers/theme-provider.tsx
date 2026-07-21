"use client";
import { ThemeProvider as NextThemeProvider } from "next-themes";

export function ThemeProvider({ children, ...props }: React.ComponentProps<typeof NextThemeProvider>) {
  return (
    <NextThemeProvider
      {...props}
      enableSystem
      attribute="class"
      defaultTheme="light"
      disableTransitionOnChange
    >
      {children}
    </NextThemeProvider>
  );
}
