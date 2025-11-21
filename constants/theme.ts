import { Platform } from "react-native";

export const Colors = {
  light: {
    text: "#1A1A1A",
    textSecondary: "rgba(0,0,0,0.6)",
    buttonText: "#FFFFFF",
    tabIconDefault: "rgba(0,0,0,0.4)",
    tabIconSelected: "#00D9FF",
    link: "#00D9FF",
    backgroundRoot: "#F8F9FA",
    backgroundDefault: "#FFFFFF",
    backgroundSecondary: "#F8F9FA",
    backgroundTertiary: "#EFEFEF",
    card: "#FFFFFF",
    border: "rgba(0,0,0,0.1)",
    neonBlue: "#00D9FF",
    neonGreen: "#00FF88",
    neonOrange: "#FF6B00",
    neonRed: "#FF3366",
    neonPurple: "#B066FF",
  },
  dark: {
    text: "#FFFFFF",
    textSecondary: "rgba(255,255,255,0.7)",
    buttonText: "#FFFFFF",
    tabIconDefault: "rgba(255,255,255,0.4)",
    tabIconSelected: "#00D9FF",
    link: "#00D9FF",
    backgroundRoot: "#0A0E27",
    backgroundDefault: "#151B3D",
    backgroundSecondary: "#1A1F3A",
    backgroundTertiary: "#252B4D",
    card: "rgba(255,255,255,0.05)",
    border: "rgba(255,255,255,0.1)",
    neonBlue: "#00D9FF",
    neonGreen: "#00FF88",
    neonOrange: "#FF6B00",
    neonRed: "#FF3366",
    neonPurple: "#B066FF",
  },
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  cardPadding: 16,
  screenHorizontal: 20,
  sectionVertical: 24,
  inputHeight: 48,
  buttonHeight: 52,
  fabSize: 64,
};

export const BorderRadius = {
  xs: 8,
  sm: 12,
  md: 16,
  lg: 24,
  xl: 26,
  fab: 32,
  full: 9999,
};

export const Typography = {
  h1: {
    fontSize: 28,
    fontWeight: "700" as const,
  },
  h2: {
    fontSize: 22,
    fontWeight: "600" as const,
  },
  h3: {
    fontSize: 18,
    fontWeight: "600" as const,
  },
  body: {
    fontSize: 16,
    fontWeight: "400" as const,
  },
  caption: {
    fontSize: 14,
    fontWeight: "400" as const,
  },
  small: {
    fontSize: 12,
    fontWeight: "500" as const,
  },
};

export const Shadows = {
  card: {
    light: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 8,
      elevation: 2,
    },
    dark: {
      shadowColor: "transparent",
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0,
      shadowRadius: 0,
      elevation: 0,
    },
  },
  fab: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
};

export const Fonts = Platform.select({
  ios: {
    sans: "system-ui",
    serif: "ui-serif",
    rounded: "ui-rounded",
    mono: "ui-monospace",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded:
      "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
