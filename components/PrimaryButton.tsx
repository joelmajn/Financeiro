import React from "react";
import { Pressable, StyleSheet, Text, ActivityIndicator } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "@/hooks/useTheme";
import { BorderRadius, Spacing, Typography } from "@/constants/theme";

interface PrimaryButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
}

export function PrimaryButton({
  title,
  onPress,
  disabled = false,
  loading = false,
}: PrimaryButtonProps) {
  const { theme } = useTheme();

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.container,
        pressed && styles.pressed,
        (disabled || loading) && styles.disabled,
      ]}
    >
      <LinearGradient
        colors={[theme.neonBlue, theme.neonPurple]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradient}
      >
        {loading ? (
          <ActivityIndicator color={theme.buttonText} />
        ) : (
          <Text style={[styles.text, { color: theme.buttonText }]}>
            {title}
          </Text>
        )}
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    height: Spacing.buttonHeight,
    borderRadius: BorderRadius.xl,
    overflow: "hidden",
  },
  gradient: {
    flex: 1,
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
