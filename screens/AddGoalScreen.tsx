import React, { useState } from "react";
import { StyleSheet, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { Input } from "@/components/Input";
import { PrimaryButton } from "@/components/PrimaryButton";
import { ScreenKeyboardAwareScrollView } from "@/components/ScreenKeyboardAwareScrollView";
import { Spacing } from "@/constants/theme";
import { useData } from "@/contexts/DataContext";

export default function AddGoalScreen() {
  const navigation = useNavigation();
  const { addGoal } = useData();
  const [name, setName] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [currentAmount, setCurrentAmount] = useState("");
  const [deadline, setDeadline] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!name || !targetAmount) {
      Alert.alert("Atenção", "Preencha pelo menos o nome e o valor da meta");
      return;
    }

    setLoading(true);
    try {
      await addGoal({
        name,
        targetAmount: parseFloat(targetAmount),
        currentAmount: currentAmount ? parseFloat(currentAmount) : 0,
        deadline: deadline || undefined,
        icon: "target",
      });
      Alert.alert("Sucesso", "Meta adicionada com sucesso!", [
        {
          text: "OK",
          onPress: () => navigation.goBack(),
        },
      ]);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível adicionar a meta");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ScreenKeyboardAwareScrollView contentContainerStyle={styles.content}>
        <ThemedText style={styles.title}>Nova Meta Financeira</ThemedText>

        <Input
          label="Nome da Meta"
          placeholder="Ex: Viagem, Notebook Novo"
          value={name}
          onChangeText={setName}
        />

        <Input
          label="Valor da Meta"
          placeholder="R$ 0,00"
          value={targetAmount}
          onChangeText={setTargetAmount}
          keyboardType="numeric"
        />

        <Input
          label="Já Possui (opcional)"
          placeholder="R$ 0,00"
          value={currentAmount}
          onChangeText={setCurrentAmount}
          keyboardType="numeric"
        />

        <Input
          label="Prazo (opcional)"
          placeholder="Ex: 2025-12-31"
          value={deadline}
          onChangeText={setDeadline}
        />

        <PrimaryButton
          title="Adicionar Meta"
          onPress={handleSubmit}
          loading={loading}
          disabled={!name || !targetAmount}
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
});
