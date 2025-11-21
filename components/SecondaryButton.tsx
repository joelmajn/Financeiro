import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { useTheme } from "@/hooks/useTheme";
import { BorderRadius, Spacing, Typography } from "@/constants/theme";

interface SecondaryButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
}

export function SecondaryButton({
  title,
  onPress,
  disabled = false,
}: SecondaryButtonProps) {
  const { theme } = useTheme();

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.container,
        {
          borderColor: theme.neonBlue,
          backgroundColor: "transparent",
        },
        pressed && styles.pressed,
        disabled && styles.disabled,
      ]}
    >
      <Text style={[styles.text, { color: theme.neonBlue }]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    height: Spacing.buttonHeight,
    borderRadius: BorderRadius.xl,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: Typography.body.fontSize,
    fontWeight: "600",
  },
  pressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  disabled: {
    opacity: 0.5,
  },
});
