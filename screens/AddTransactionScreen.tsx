import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { Input } from "@/components/Input";
import { PrimaryButton } from "@/components/PrimaryButton";
import { SecondaryButton } from "@/components/SecondaryButton";
import { ScreenKeyboardAwareScrollView } from "@/components/ScreenKeyboardAwareScrollView";
import { Spacing } from "@/constants/theme";

export default function AddTransactionScreen() {
  const navigation = useNavigation();
  const [type, setType] = useState<"income" | "expense">("expense");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    if (!amount) return;

    setLoading(true);
    setTimeout(() => {
      Alert.alert(
        "Sucesso",
        `${type === "income" ? "Receita" : "Despesa"} adicionada com sucesso!`,
        [
          {
            text: "OK",
            onPress: () => navigation.goBack(),
          },
        ]
      );
      setLoading(false);
    }, 1000);
  };

  return (
    <ThemedView style={styles.container}>
      <ScreenKeyboardAwareScrollView contentContainerStyle={styles.content}>
        <ThemedText style={styles.title}>Nova Transação</ThemedText>

        <View style={styles.typeButtons}>
          <SecondaryButton
            title="Receita"
            onPress={() => setType("income")}
          />
          <View style={styles.buttonSpacing} />
          <SecondaryButton
            title="Despesa"
            onPress={() => setType("expense")}
          />
        </View>

        <Input
          label="Valor"
          placeholder="R$ 0,00"
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
        />

        <Input
          label="Descrição"
          placeholder="Ex: Compras no mercado"
          value={description}
          onChangeText={setDescription}
        />

        <PrimaryButton
          title="Adicionar"
          onPress={handleSubmit}
          loading={loading}
          disabled={!amount}
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
  typeButtons: {
    flexDirection: "row",
    gap: Spacing.md,
    marginBottom: Spacing.lg,
  },
  buttonSpacing: {
    width: Spacing.md,
  },
});
