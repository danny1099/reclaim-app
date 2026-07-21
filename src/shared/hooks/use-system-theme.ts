import { Dispatch, SetStateAction, useMemo } from "react";
import { useTheme } from "next-themes";

type Theme = "dark" | "light";
type SetTheme = Dispatch<SetStateAction<Theme>>;

export const useSystemTheme = () => {
  const { theme, setTheme, systemTheme } = useTheme();

  return useMemo(() => {
    return {
      theme: theme === "system" ? systemTheme : theme,
      setTheme,
    } as { theme: Theme; setTheme: SetTheme };
  }, [theme, setTheme, systemTheme]);
};
