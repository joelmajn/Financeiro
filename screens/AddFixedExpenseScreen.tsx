import React, { useState } from "react";
import { View, StyleSheet, Alert, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { Input } from "@/components/Input";
import { PrimaryButton } from "@/components/PrimaryButton";
import { ScreenKeyboardAwareScrollView } from "@/components/ScreenKeyboardAwareScrollView";
import { Spacing, BorderRadius } from "@/constants/theme";
import { useData } from "@/contexts/DataContext";
import { useTheme } from "@/hooks/useTheme";

export default function AddFixedExpenseScreen() {
  const navigation = useNavigation();
  const { addFixedExpense, accounts } = useData();
  const { theme } = useTheme();
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [dueDay, setDueDay] = useState("");
  const [selectedAccountId, setSelectedAccountId] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!description || !amount || !dueDay) {
      Alert.alert("Atenção", "Preencha todos os campos obrigatórios");
      return;
    }

    if (!selectedAccountId) {
      Alert.alert("Atenção", "Selecione uma conta");
      return;
    }

    setLoading(true);
    try {
      await addFixedExpense({
        description,
        amount: parseFloat(amount),
        dueDay: parseInt(dueDay),
        category: "outros",
        accountId: selectedAccountId,
        isPaid: false,
      });
      Alert.alert("Sucesso", "Despesa fixa adicionada com sucesso!", [
        {
          text: "OK",
          onPress: () => navigation.goBack(),
        },
      ]);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível adicionar a despesa fixa");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ScreenKeyboardAwareScrollView contentContainerStyle={styles.content}>
        <ThemedText style={styles.title}>Nova Despesa Fixa</ThemedText>

        <Input
          label="Descrição"
          placeholder="Ex: Aluguel, Internet"
          value={description}
          onChangeText={setDescription}
        />

        <Input
          label="Valor Mensal"
          placeholder="R$ 0,00"
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
        />

        <Input
          label="Dia de Vencimento"
          placeholder="Ex: 10"
          value={dueDay}
          onChangeText={setDueDay}
          keyboardType="numeric"
        />

        <ThemedText style={styles.sectionLabel}>Conta de Débito</ThemedText>
        {accounts.length === 0 ? (
          <ThemedText style={styles.emptyText}>
            Nenhuma conta cadastrada
          </ThemedText>
        ) : (
          <View style={styles.accountList}>
            {accounts.map((account) => (
              <Pressable
                key={account.id}
                onPress={() => setSelectedAccountId(account.id)}
                style={[
                  styles.accountItem,
                  {
                    backgroundColor: theme.card,
                    borderColor:
                      selectedAccountId === account.id
                        ? theme.neonBlue
                        : theme.border,
                    borderWidth: 2,
                  },
                ]}
              >
                <ThemedText>{account.name}</ThemedText>
                <ThemedText>R$ {account.balance.toFixed(2)}</ThemedText>
              </Pressable>
            ))}
          </View>
        )}

        <PrimaryButton
          title="Adicionar Despesa Fixa"
          onPress={handleSubmit}
          loading={loading}
          disabled={!description || !amount || !dueDay}
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
  accountList: {
    gap: Spacing.sm,
    marginBottom: Spacing.lg,
  },
  accountItem: {
    padding: Spacing.cardPadding,
    borderRadius: BorderRadius.md,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  emptyText: {
    textAlign: "center",
    opacity: 0.6,
    marginVertical: Spacing.md,
  },
});
