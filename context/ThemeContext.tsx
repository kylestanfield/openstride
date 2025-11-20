import React, {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import { Appearance, useColorScheme } from "react-native";
import {
  darkColors,
  darkTheme,
  lightColors,
  lightTheme,
  radii,
  spacing,
  themes,
  typography,
} from "../constants/theme";

interface ThemeProviderProps {
  children: React.ReactNode;
}

export interface AppTheme {
  colors: typeof lightColors;
  typography: typeof typography;
  spacing: typeof spacing;
  radii: typeof radii;
}

interface ThemeContextValue {
  mode: "light" | "dark";
  theme: AppTheme;
  setMode: (mode: "light" | "dark") => void;
}

export const ThemeContext = createContext<ThemeContextValue>({
  mode: "light",
  theme: lightTheme,
  setMode: () => {},
});

export function ThemeProvider({ children }: ThemeProviderProps) {
  const systemColorScheme = useColorScheme();
  const [mode, setMode] = useState<"light" | "dark">(
    systemColorScheme === "dark" ? "dark" : "light",
  );

  // Auto-switch if the system theme changes
  useEffect(() => {
    setMode(systemColorScheme === "dark" ? "dark" : "light");
  }, [systemColorScheme]);

  const theme = mode === "dark" ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ theme, mode, setMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook
export const useTheme = () => useContext(ThemeContext);
