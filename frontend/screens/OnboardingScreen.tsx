import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { ThemedText } from "@/components/ThemedText";
import { Input } from "@/components/Input";
import { PrimaryButton } from "@/components/PrimaryButton";
import { Spacing } from "@/constants/theme";
import { useAuth } from "@/contexts/AuthContext";
import { ScreenKeyboardAwareScrollView } from "@/components/ScreenKeyboardAwareScrollView";

export default function OnboardingScreen() {
  const { completeOnboarding } = useAuth();
  const [monthlyIncome, setMonthlyIncome] = useState("");
  const [hasDebts, setHasDebts] = useState<boolean | null>(null);

  const handleComplete = () => {
    completeOnboarding();
  };

  return (
    <LinearGradient colors={["#0A0E27", "#1A0A2E"]} style={styles.gradient}>
      <ScreenKeyboardAwareScrollView contentContainerStyle={styles.container}>
        <ThemedText style={styles.title}>Vamos começar!</ThemedText>
        <ThemedText style={styles.subtitle}>
          Algumas perguntas rápidas para personalizar sua experiência
        </ThemedText>

        <Input
          label="Qual sua renda mensal aproximada?"
          placeholder="R$ 0,00"
          value={monthlyIncome}
          onChangeText={setMonthlyIncome}
          keyboardType="numeric"
        />

        <ThemedText style={styles.questionLabel}>Você possui dívidas?</ThemedText>
        <View style={styles.buttonGroup}>
          <PrimaryButton
            title="Sim"
            onPress={() => setHasDebts(true)}
          />
          <View style={styles.buttonSpacing} />
          <PrimaryButton
            title="Não"
            onPress={() => setHasDebts(false)}
          />
        </View>

        <View style={styles.spacing} />

        <PrimaryButton
          title="Começar"
          onPress={handleComplete}
          disabled={!monthlyIncome || hasDebts === null}
        />
      </ScreenKeyboardAwareScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    paddingHorizontal: Spacing.screenHorizontal,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: Spacing.sm,
  },
  subtitle: {
    fontSize: 16,
    color: "rgba(255,255,255,0.7)",
    marginBottom: Spacing.xl,
  },
  questionLabel: {
    fontSize: 14,
    color: "#FFFFFF",
    fontWeight: "500",
    marginBottom: Spacing.sm,
  },
  buttonGroup: {
    flexDirection: "row",
    gap: Spacing.md,
  },
  buttonSpacing: {
    width: Spacing.md,
  },
  spacing: {
    height: Spacing.lg,
  },
});
