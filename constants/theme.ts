// constants/theme.ts

import { Appearance } from "react-native";

export const lightColors = {
  background: "#F8F8FF",
  surface: "#FFFFFF",

  primary: {
    50: "#E0F7F9",
    100: "#B3ECF0",
    200: "#80E0E5",
    300: "#4DD4DA",
    400: "#26C9D0",
    500: "#0FA3B1",
    600: "#0B8490",
    700: "#086772",
    800: "#054954",
    900: "#033039",
  },

  accent: {
    50: "#FFECEB",
    100: "#FFD4D2",
    200: "#FFBAB5",
    300: "#FF9E96",
    400: "#FF857D",
    500: "#FF6F61",
    600: "#E65C51",
    700: "#CC4A42",
    800: "#B33A35",
    900: "#99302B",
  },

  neutral: {
    50: "#F9FAFB",
    100: "#F3F4F6",
    200: "#E5E7EB",
    300: "#D1D5DB",
    400: "#9CA3AF",
    500: "#6B7280",
    600: "#4B5563",
    700: "#374151",
    800: "#1F2937",
    900: "#111827",
  },

  inactiveTab: "#D1D5DB", // neutral 300

  error: "#EF4444",

  text: {
    primary: "#111827",
    secondary: "#374151",
    tertiary: "#6B7280",
    inverse: "#FFFFFF",
  },

  border: "#E5E7EB",
  shadow: "#000000",
};

export const darkColors = {
  background: "#0F1214",
  surface: "#1A1D20",

  primary: lightColors.primary, // same palette, different usage
  accent: lightColors.accent,

  neutral: {
    50: "#A9AFB9",
    100: "#8F97A2",
    200: "#757F8C",
    300: "#5B6675",
    400: "#424E5E",
    500: "#2A3647",
    600: "#1E2838",
    700: "#121A28",
    800: "#0A1017",
    900: "#04070B",
  },

  inactiveTab: "#757F8C", // neutral 200

  error: "#F87171",

  text: {
    primary: "#F9FAFB",
    secondary: "#D1D5DB",
    tertiary: "#9CA3AF",
    inverse: "#000000",
  },

  border: "#2A2F34",
  shadow: "#000000",
};

// ----------------------------
// TYPOGRAPHY
// ----------------------------
export const typography = {
  fontFamily: {
    regular: "System",
    medium: "System",
    bold: "System",
  },

  size: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 20,
    xl: 24,
    "2xl": 30,
    "3xl": 36,
  },

  lineHeight: {
    xs: 16,
    sm: 18,
    md: 22,
    lg: 28,
    xl: 32,
    "2xl": 36,
    "3xl": 44,
  },
};

// ----------------------------
// SPACING (8-point scale)
// ----------------------------
export const spacing = {
  0: 0,
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  7: 28,
  8: 32,
  10: 40,
  12: 48,
  16: 64,
  20: 80,
};

// ----------------------------
// BORDER RADIUS
// ----------------------------
export const radii = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,
};

export const lightTheme = {
  colors: lightColors,
  typography,
  spacing,
  radii,
};

export const darkTheme = {
  colors: darkColors,
  typography,
  spacing,
  radii,
};

export const themes = {
  light: lightTheme,
  dark: darkTheme,
};

// Auto-detect device setting
export const getDefaultTheme = () =>
  Appearance.getColorScheme() === "dark" ? themes.dark : themes.light;
