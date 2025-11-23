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

export default function AddCardScreen() {
  const navigation = useNavigation();
  const { addCard } = useData();
  const [name, setName] = useState("");
  const [bank, setBank] = useState("");
  const [brand, setBrand] = useState("");
  const [limit, setLimit] = useState("");
  const [closingDay, setClosingDay] = useState("");
  const [dueDay, setDueDay] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!name || !bank || !brand || !limit || !closingDay || !dueDay) return;

    setLoading(true);
    try {
      await addCard({
        name,
        bank,
        brand,
        limit: parseFloat(limit),
        closingDay: parseInt(closingDay),
        dueDay: parseInt(dueDay),
        currentBalance: 0,
      });
      Alert.alert("Sucesso", "Cartão adicionado com sucesso!", [
        {
          text: "OK",
          onPress: () => navigation.goBack(),
        },
      ]);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível adicionar o cartão");
    } finally {
      setLoading(false);
    }
  };

  const isFormValid =
    name && bank && brand && limit && closingDay && dueDay;

  return (
    <ThemedView style={styles.container}>
      <ScreenKeyboardAwareScrollView contentContainerStyle={styles.content}>
        <ThemedText style={styles.title}>Novo Cartão de Crédito</ThemedText>

        <Input
          label="Nome do Cartão"
          placeholder="Ex: Nubank"
          value={name}
          onChangeText={setName}
        />

        <Input
          label="Banco"
          placeholder="Ex: Nubank"
          value={bank}
          onChangeText={setBank}
        />

        <Input
          label="Bandeira"
          placeholder="Ex: Mastercard, Visa"
          value={brand}
          onChangeText={setBrand}
        />

        <Input
          label="Limite Total"
          placeholder="R$ 0,00"
          value={limit}
          onChangeText={setLimit}
          keyboardType="numeric"
        />

        <Input
          label="Dia de Fechamento"
          placeholder="Ex: 15"
          value={closingDay}
          onChangeText={setClosingDay}
          keyboardType="numeric"
        />

        <Input
          label="Dia de Vencimento"
          placeholder="Ex: 25"
          value={dueDay}
          onChangeText={setDueDay}
          keyboardType="numeric"
        />

        <PrimaryButton
          title="Adicionar Cartão"
          onPress={handleSubmit}
          loading={loading}
          disabled={!isFormValid}
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
