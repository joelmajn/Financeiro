import React, { useState } from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { BalanceCard } from "@/components/BalanceCard";
import { FAB } from "@/components/FAB";
import { ScreenScrollView } from "@/components/ScreenScrollView";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, BorderRadius } from "@/constants/theme";

export default function DashboardScreen() {
  const { theme } = useTheme();
  const navigation = useNavigation<any>();
  const [currentBalance] = useState(5420.50);
  const [projectedBalance] = useState(3180.00);
  const [monthlyIncome] = useState(6500.00);
  const [monthlyExpenses] = useState(3320.50);

  const handleAddTransaction = () => {
    navigation.navigate("AddTransaction");
  };

  return (
    <ThemedView style={styles.container}>
      <ScreenScrollView>
        <View style={styles.header}>
          <ThemedText style={styles.greeting}>Olá, Usuário</ThemedText>
          <ThemedText style={styles.month}>Novembro 2025</ThemedText>
        </View>

        <BalanceCard
          title="Saldo Atual"
          value={currentBalance}
          subtitle="Total disponível em suas contas"
        />

        <BalanceCard
          title="Projeção do Mês"
          value={projectedBalance}
          subtitle="Saldo previsto para 30/11"
          color={projectedBalance >= 0 ? theme.neonGreen : theme.neonRed}
        />

        <View style={styles.statsGrid}>
          <View
            style={[
              styles.statCard,
              {
                backgroundColor: theme.card,
                borderColor: theme.border,
              },
            ]}
          >
            <Feather name="arrow-down-circle" size={24} color={theme.neonGreen} />
            <ThemedText style={styles.statValue}>
              {monthlyIncome.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </ThemedText>
            <ThemedText style={styles.statLabel}>Receitas</ThemedText>
          </View>

          <View
            style={[
              styles.statCard,
              {
                backgroundColor: theme.card,
                borderColor: theme.border,
              },
            ]}
          >
            <Feather name="arrow-up-circle" size={24} color={theme.neonOrange} />
            <ThemedText style={styles.statValue}>
              {monthlyExpenses.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </ThemedText>
            <ThemedText style={styles.statLabel}>Despesas</ThemedText>
          </View>
        </View>

        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Contas Fixas Próximas</ThemedText>
          <Pressable
            style={[
              styles.billItem,
              {
                backgroundColor: theme.card,
                borderColor: theme.border,
              },
            ]}
          >
            <View style={styles.billInfo}>
              <Feather name="home" size={20} color={theme.neonBlue} />
              <View style={styles.billText}>
                <ThemedText style={styles.billName}>Aluguel</ThemedText>
                <ThemedText style={styles.billDate}>Vence em 5 dias</ThemedText>
              </View>
            </View>
            <ThemedText style={styles.billAmount}>R$ 1.200,00</ThemedText>
          </Pressable>
        </View>
      </ScreenScrollView>

      <FAB onPress={handleAddTransaction} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    marginBottom: Spacing.lg,
  },
  greeting: {
    fontSize: 28,
    fontWeight: "700",
  },
  month: {
    fontSize: 16,
    opacity: 0.6,
    marginTop: Spacing.xs,
  },
  statsGrid: {
    flexDirection: "row",
    gap: Spacing.md,
    marginBottom: Spacing.lg,
  },
  statCard: {
    flex: 1,
    padding: Spacing.cardPadding,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    alignItems: "center",
  },
  statValue: {
    fontSize: 18,
    fontWeight: "700",
    marginTop: Spacing.sm,
  },
  statLabel: {
    fontSize: 12,
    opacity: 0.6,
    marginTop: Spacing.xs,
  },
  section: {
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: Spacing.md,
  },
  billItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: Spacing.cardPadding,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
  },
  billInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
  },
  billText: {
    gap: Spacing.xs,
  },
  billName: {
    fontSize: 16,
    fontWeight: "600",
  },
  billDate: {
    fontSize: 14,
    opacity: 0.6,
  },
  billAmount: {
    fontSize: 16,
    fontWeight: "700",
  },
});
