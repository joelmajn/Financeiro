import React, { useState } from "react";
import { View, StyleSheet, Alert, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { Input } from "@/components/Input";
import { PrimaryButton } from "@/components/PrimaryButton";
import { SecondaryButton } from "@/components/SecondaryButton";
import { ScreenKeyboardAwareScrollView } from "@/components/ScreenKeyboardAwareScrollView";
import { Spacing, BorderRadius } from "@/constants/theme";
import { useData } from "@/contexts/DataContext";
import { useTheme } from "@/hooks/useTheme";

export default function AddTransactionScreen() {
  const navigation = useNavigation();
  const { addIncome, addVariableExpense, accounts, cards } = useData();
  const { theme } = useTheme();
  const [type, setType] = useState<"income" | "expense">("expense");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [selectedAccountId, setSelectedAccountId] = useState<string>("");
  const [selectedCardId, setSelectedCardId] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "debit" | "credit">("cash");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!amount) {
      Alert.alert("Atenção", "Informe o valor da transação");
      return;
    }

    if (type === "income" && !selectedAccountId) {
      Alert.alert("Atenção", "Selecione uma conta de destino");
      return;
    }

    if (type === "expense") {
      if (paymentMethod === "credit" && !selectedCardId) {
        Alert.alert("Atenção", "Selecione um cartão de crédito");
        return;
      }
      if ((paymentMethod === "cash" || paymentMethod === "debit") && !selectedAccountId) {
        Alert.alert("Atenção", "Selecione uma conta");
        return;
      }
    }

    setLoading(true);
    try {
      const value = parseFloat(amount);
      const today = new Date().toISOString();

      if (type === "income") {
        await addIncome({
          amount: value,
          date: today,
          category: "outros",
          accountId: selectedAccountId,
          description,
        });
      } else {
        await addVariableExpense({
          amount: value,
          date: today,
          category: "outros",
          paymentMethod,
          accountId: paymentMethod !== "credit" ? selectedAccountId : undefined,
          cardId: paymentMethod === "credit" ? selectedCardId : undefined,
          description,
        });
      }

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
    } catch (error) {
      Alert.alert("Erro", "Não foi possível adicionar a transação");
    } finally {
      setLoading(false);
    }
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

        {type === "expense" ? (
          <>
            <ThemedText style={styles.sectionLabel}>Forma de Pagamento</ThemedText>
            <View style={styles.paymentMethods}>
              {[
                { id: "cash" as const, label: "Dinheiro", icon: "dollar-sign" },
                { id: "debit" as const, label: "Débito", icon: "credit-card" },
                { id: "credit" as const, label: "Crédito", icon: "credit-card" },
              ].map((method) => (
                <Pressable
                  key={method.id}
                  onPress={() => setPaymentMethod(method.id)}
                  style={[
                    styles.methodCard,
                    {
                      backgroundColor: theme.card,
                      borderColor:
                        paymentMethod === method.id ? theme.neonBlue : theme.border,
                      borderWidth: 2,
                    },
                  ]}
                >
                  <Feather
                    name={method.icon as any}
                    size={20}
                    color={paymentMethod === method.id ? theme.neonBlue : theme.text}
                  />
                  <ThemedText style={styles.methodLabel}>{method.label}</ThemedText>
                </Pressable>
              ))}
            </View>

            {paymentMethod === "credit" ? (
              <>
                <ThemedText style={styles.sectionLabel}>Cartão de Crédito</ThemedText>
                {cards.length === 0 ? (
                  <ThemedText style={styles.emptyText}>
                    Nenhum cartão cadastrado
                  </ThemedText>
                ) : (
                  <View style={styles.accountList}>
                    {cards.map((card) => (
                      <Pressable
                        key={card.id}
                        onPress={() => setSelectedCardId(card.id)}
                        style={[
                          styles.accountItem,
                          {
                            backgroundColor: theme.card,
                            borderColor:
                              selectedCardId === card.id ? theme.neonBlue : theme.border,
                            borderWidth: 2,
                          },
                        ]}
                      >
                        <ThemedText>{card.name}</ThemedText>
                        <ThemedText style={styles.cardLimit}>
                          Disponível: R${" "}
                          {(card.limit - card.currentBalance).toFixed(2)}
                        </ThemedText>
                      </Pressable>
                    ))}
                  </View>
                )}
              </>
            ) : (
              <>
                <ThemedText style={styles.sectionLabel}>Conta</ThemedText>
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
              </>
            )}
          </>
        ) : (
          <>
            <ThemedText style={styles.sectionLabel}>Conta de Destino</ThemedText>
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
          </>
        )}

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
  sectionLabel: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: Spacing.sm,
    marginTop: Spacing.md,
  },
  paymentMethods: {
    flexDirection: "row",
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  methodCard: {
    flex: 1,
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    alignItems: "center",
    gap: Spacing.xs,
  },
  methodLabel: {
    fontSize: 12,
    textAlign: "center",
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
  cardLimit: {
    fontSize: 12,
    opacity: 0.7,
  },
});
