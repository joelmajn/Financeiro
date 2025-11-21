import React, { useState } from "react";
import { View, StyleSheet, Pressable, FlatList } from "react-native";
import { Feather } from "@expo/vector-icons";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { FAB } from "@/components/FAB";
import { ScreenScrollView } from "@/components/ScreenScrollView";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, BorderRadius } from "@/constants/theme";
import { Account } from "@/types";

export default function AccountsScreen() {
  const { theme } = useTheme();
  const [accounts] = useState<Account[]>([
    {
      id: "1",
      name: "Nubank",
      type: "bank",
      balance: 3420.50,
      icon: "briefcase",
      createdAt: new Date().toISOString(),
    },
    {
      id: "2",
      name: "Carteira",
      type: "wallet",
      balance: 250.00,
      icon: "dollar-sign",
      createdAt: new Date().toISOString(),
    },
    {
      id: "3",
      name: "Poupança",
      type: "savings",
      balance: 1750.00,
      icon: "trending-up",
      createdAt: new Date().toISOString(),
    },
  ]);

  const getIconName = (type: string): any => {
    switch (type) {
      case "bank":
        return "briefcase";
      case "wallet":
        return "dollar-sign";
      case "savings":
        return "trending-up";
      case "investment":
        return "bar-chart-2";
      default:
        return "briefcase";
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "bank":
        return "Conta Bancária";
      case "wallet":
        return "Carteira";
      case "savings":
        return "Poupança";
      case "investment":
        return "Investimento";
      default:
        return type;
    }
  };

  const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0);

  return (
    <ThemedView style={styles.container}>
      <ScreenScrollView>
        <View
          style={[
            styles.totalCard,
            {
              backgroundColor: theme.card,
            },
          ]}
        >
          <ThemedText style={styles.totalLabel}>Saldo Total</ThemedText>
          <ThemedText style={[styles.totalValue, { color: theme.neonGreen }]}>
            {totalBalance.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </ThemedText>
        </View>

        <ThemedText style={styles.sectionTitle}>Minhas Contas</ThemedText>

        {accounts.map((account) => (
          <Pressable
            key={account.id}
            style={({ pressed }) => [
              styles.accountCard,
              {
                backgroundColor: theme.card,
                borderColor: theme.border,
              },
              pressed && styles.pressed,
            ]}
          >
            <View style={styles.accountInfo}>
              <View
                style={[
                  styles.iconContainer,
                  {
                    backgroundColor: `${theme.neonBlue}20`,
                  },
                ]}
              >
                <Feather
                  name={getIconName(account.type)}
                  size={24}
                  color={theme.neonBlue}
                />
              </View>
              <View style={styles.accountText}>
                <ThemedText style={styles.accountName}>{account.name}</ThemedText>
                <ThemedText style={styles.accountType}>
                  {getTypeLabel(account.type)}
                </ThemedText>
              </View>
            </View>
            <ThemedText style={styles.accountBalance}>
              {account.balance.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </ThemedText>
          </Pressable>
        ))}
      </ScreenScrollView>

      <FAB onPress={() => {}} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  totalCard: {
    padding: Spacing.lg,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.lg,
    alignItems: "center",
  },
  totalLabel: {
    fontSize: 14,
    opacity: 0.7,
    marginBottom: Spacing.xs,
  },
  totalValue: {
    fontSize: 32,
    fontWeight: "700",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: Spacing.md,
  },
  accountCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: Spacing.cardPadding,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    marginBottom: Spacing.md,
  },
  accountInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.sm,
    justifyContent: "center",
    alignItems: "center",
  },
  accountText: {
    gap: Spacing.xs,
  },
  accountName: {
    fontSize: 16,
    fontWeight: "600",
  },
  accountType: {
    fontSize: 14,
    opacity: 0.6,
  },
  accountBalance: {
    fontSize: 18,
    fontWeight: "700",
  },
  pressed: {
    opacity: 0.7,
  },
});
