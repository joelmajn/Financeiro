import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { Input } from "@/components/Input";
import { PrimaryButton } from "@/components/PrimaryButton";
import { ScreenKeyboardAwareScrollView } from "@/components/ScreenKeyboardAwareScrollView";
import { Spacing, BorderRadius } from "@/constants/theme";
import { useData } from "@/contexts/DataContext";
import { useTheme } from "@/hooks/useTheme";
import { Pressable } from "react-native";

export default function AddAccountScreen() {
  const navigation = useNavigation();
  const { addAccount } = useData();
  const { theme } = useTheme();
  const [name, setName] = useState("");
  const [balance, setBalance] = useState("");
  const [type, setType] = useState<"bank" | "wallet" | "savings" | "investment">("bank");
  const [loading, setLoading] = useState(false);

  const accountTypes = [
    { id: "bank" as const, label: "Conta Bancária", icon: "briefcase" },
    { id: "wallet" as const, label: "Carteira", icon: "dollar-sign" },
    { id: "savings" as const, label: "Poupança", icon: "trending-up" },
    { id: "investment" as const, label: "Investimento", icon: "bar-chart-2" },
  ];

  const handleSubmit = async () => {
    if (!name || !balance) return;

    setLoading(true);
    try {
      await addAccount({
        name,
        balance: parseFloat(balance),
        type,
        icon: accountTypes.find((t) => t.id === type)?.icon || "briefcase",
      });
      Alert.alert("Sucesso", "Conta adicionada com sucesso!", [
        {
          text: "OK",
          onPress: () => navigation.goBack(),
        },
      ]);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível adicionar a conta");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ScreenKeyboardAwareScrollView contentContainerStyle={styles.content}>
        <ThemedText style={styles.title}>Nova Conta</ThemedText>

        <Input
          label="Nome da Conta"
          placeholder="Ex: Nubank"
          value={name}
          onChangeText={setName}
        />

        <Input
          label="Saldo Inicial"
          placeholder="R$ 0,00"
          value={balance}
          onChangeText={setBalance}
          keyboardType="numeric"
        />

        <ThemedText style={styles.sectionLabel}>Tipo de Conta</ThemedText>
        <View style={styles.typeGrid}>
          {accountTypes.map((accountType) => (
            <Pressable
              key={accountType.id}
              onPress={() => setType(accountType.id)}
              style={[
                styles.typeCard,
                {
                  backgroundColor: theme.card,
                  borderColor:
                    type === accountType.id ? theme.neonBlue : theme.border,
                  borderWidth: 2,
                },
              ]}
            >
              <Feather
                name={accountType.icon as any}
                size={24}
                color={type === accountType.id ? theme.neonBlue : theme.text}
              />
              <ThemedText style={styles.typeLabel}>
                {accountType.label}
              </ThemedText>
            </Pressable>
          ))}
        </View>

        <PrimaryButton
          title="Adicionar Conta"
          onPress={handleSubmit}
          loading={loading}
          disabled={!name || !balance}
        />
      </ScreenKeyboardAwareScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: Spacing.screenHorizontal,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: Spacing.lg,
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: Spacing.sm,
    marginTop: Spacing.md,
  },
  typeGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.md,
    marginBottom: Spacing.lg,
  },
  typeCard: {
    width: "47%",
    padding: Spacing.cardPadding,
    borderRadius: BorderRadius.md,
    alignItems: "center",
    gap: Spacing.sm,
  },
  typeLabel: {
    fontSize: 12,
    textAlign: "center",
  },
});
