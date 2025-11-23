import React from "react";
import { View, StyleSheet } from "react-native";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, BorderRadius } from "@/constants/theme";

interface PinInputProps {
  length: number;
  filledCount: number;
}

export function PinInput({ length, filledCount }: PinInputProps) {
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      {Array.from({ length }).map((_, index) => (
        <View
          key={index}
          style={[
            styles.dot,
            {
              backgroundColor:
                index < filledCount ? theme.neonBlue : "transparent",
              borderColor: theme.border,
            },
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    gap: Spacing.md,
    marginVertical: Spacing.xl,
  },
  dot: {
    width: 16,
    height: 16,
    borderRadius: BorderRadius.full,
    borderWidth: 2,
  },
});
