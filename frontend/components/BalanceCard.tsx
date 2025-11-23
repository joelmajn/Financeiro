import React from "react";
import { View, StyleSheet } from "react-native";
import { ThemedText } from "./ThemedText";
import { useTheme } from "@/hooks/useTheme";
import { BorderRadius, Spacing, Typography } from "@/constants/theme";

interface BalanceCardProps {
  title: string;
  value: number;
  subtitle?: string;
  color?: string;
}

export function BalanceCard({
  title,
  value,
  subtitle,
  color,
}: BalanceCardProps) {
  const { theme, colorScheme } = useTheme();

  const formattedValue = value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.card,
          ...((colorScheme === "light") ? {
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.08,
            shadowRadius: 8,
            elevation: 2,
          } : {}),
        },
      ]}
    >
      <ThemedText style={styles.title}>{title}</ThemedText>
      <ThemedText
        style={[
          styles.value,
          color ? { color } : { color: theme.neonGreen },
        ]}
      >
        {formattedValue}
      </ThemedText>
      {subtitle ? (
        <ThemedText style={styles.subtitle}>{subtitle}</ThemedText>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: Spacing.cardPadding,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.md,
  },
  title: {
    fontSize: Typography.caption.fontSize,
    opacity: 0.7,
    marginBottom: Spacing.xs,
  },
  value: {
    fontSize: Typography.h1.fontSize,
    fontWeight: Typography.h1.fontWeight,
  },
  subtitle: {
    fontSize: Typography.caption.fontSize,
    opacity: 0.6,
    marginTop: Spacing.xs,
  },
});
