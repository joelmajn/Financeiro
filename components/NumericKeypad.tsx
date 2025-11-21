import React from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";
import { ThemedText } from "./ThemedText";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, BorderRadius } from "@/constants/theme";

interface NumericKeypadProps {
  onPress: (value: string) => void;
  onDelete: () => void;
  showBiometric?: boolean;
  onBiometric?: () => void;
}

export function NumericKeypad({
  onPress,
  onDelete,
  showBiometric = false,
  onBiometric,
}: NumericKeypadProps) {
  const { theme } = useTheme();

  const keys = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],
    [showBiometric ? "biometric" : "", "0", "delete"],
  ];

  return (
    <View style={styles.container}>
      {keys.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((key) => {
            if (key === "") {
              return <View key="empty" style={styles.key} />;
            }

            if (key === "delete") {
              return (
                <Pressable
                  key={key}
                  onPress={onDelete}
                  style={({ pressed }) => [
                    styles.key,
                    styles.specialKey,
                    pressed && styles.pressed,
                  ]}
                >
                  <Feather name="delete" size={24} color={theme.text} />
                </Pressable>
              );
            }

            if (key === "biometric") {
              return (
                <Pressable
                  key={key}
                  onPress={onBiometric}
                  style={({ pressed }) => [
                    styles.key,
                    styles.specialKey,
                    pressed && styles.pressed,
                  ]}
                >
                  <Feather name="smartphone" size={24} color={theme.neonBlue} />
                </Pressable>
              );
            }

            return (
              <Pressable
                key={key}
                onPress={() => onPress(key)}
                style={({ pressed }) => [
                  styles.key,
                  {
                    backgroundColor: theme.card,
                    borderColor: theme.border,
                  },
                  pressed && styles.pressed,
                ]}
              >
                <ThemedText style={styles.keyText}>{key}</ThemedText>
              </Pressable>
            );
          })}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    maxWidth: 300,
    alignSelf: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: Spacing.md,
  },
  key: {
    width: 70,
    height: 70,
    borderRadius: BorderRadius.full,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
  },
  specialKey: {
    borderWidth: 0,
    backgroundColor: "transparent",
  },
  keyText: {
    fontSize: 24,
    fontWeight: "600",
  },
  pressed: {
    opacity: 0.6,
    transform: [{ scale: 0.95 }],
  },
});
