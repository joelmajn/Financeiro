import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { BalanceCard } from "@/components/BalanceCard";
import { ScreenScrollView } from "@/components/ScreenScrollView";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, BorderRadius } from "@/constants/theme";

export default function ReportsScreen() {
  const { theme } = useTheme();
  const [monthlyIncome] = useState(6500.00);
  const [monthlyExpenses] = useState(3320.50);
  const [balance] = useState(3179.50);

  const categories = [
    { name: "Alimentação", amount: 890.50, icon: "shopping-bag", color: theme.neonOrange },
    { name: "Transporte", amount: 520.00, icon: "truck", color: theme.neonBlue },
    { name: "Moradia", amount: 1200.00, icon: "home", color: theme.neonPurple },
    { name: "Lazer", amount: 450.00, icon: "coffee", color: theme.neonGreen },
    { name: "Outros", amount: 260.00, icon: "more-horizontal", color: theme.neonRed },
  ];

  const goals = [
    { name: "Viagem", current: 1500, target: 5000, icon: "map-pin" },
    { name: "Notebook Novo", current: 800, target: 3500, icon: "laptop" },
  ];

  return (
    <ThemedView style={styles.container}>
      <ScreenScrollView>
        <ThemedText style={styles.sectionTitle}>Resumo do Mês</ThemedText>

        <View style={styles.summaryGrid}>
          <View
            style={[
              styles.summaryCard,
              {
                backgroundColor: theme.card,
                borderColor: theme.border,
              },
            ]}
          >
            <Feather name="arrow-down-circle" size={28} color={theme.neonGreen} />
            <ThemedText style={styles.summaryValue}>
              {monthlyIncome.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </ThemedText>
            <ThemedText style={styles.summaryLabel}>Receitas</ThemedText>
          </View>

          <View
            style={[
              styles.summaryCard,
              {
                backgroundColor: theme.card,
                borderColor: theme.border,
              },
            ]}
          >
            <Feather name="arrow-up-circle" size={28} color={theme.neonOrange} />
            <ThemedText style={styles.summaryValue}>
              {monthlyExpenses.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </ThemedText>
            <ThemedText style={styles.summaryLabel}>Despesas</ThemedText>
          </View>
        </View>

        <BalanceCard
          title="Saldo do Mês"
          value={balance}
          color={balance >= 0 ? theme.neonGreen : theme.neonRed}
        />

        <ThemedText style={styles.sectionTitle}>Despesas por Categoria</ThemedText>

        {categories.map((category) => {
          const percentage = (category.amount / monthlyExpenses) * 100;
          return (
            <View
              key={category.name}
              style={[
                styles.categoryItem,
                {
                  backgroundColor: theme.card,
                  borderColor: theme.border,
                },
              ]}
            >
              <View style={styles.categoryHeader}>
                <View style={styles.categoryInfo}>
                  <Feather name={category.icon as any} size={20} color={category.color} />
                  <ThemedText style={styles.categoryName}>{category.name}</ThemedText>
                </View>
                <ThemedText style={styles.categoryAmount}>
                  {category.amount.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </ThemedText>
              </View>
              <View style={styles.progressBar}>
                <View
                  style={[
                    styles.progressFill,
                    {
                      width: `${percentage}%`,
                      backgroundColor: category.color,
                    },
                  ]}
                />
              </View>
            </View>
          );
        })}

        <ThemedText style={styles.sectionTitle}>Metas Financeiras</ThemedText>

        {goals.map((goal) => {
          const progress = (goal.current / goal.target) * 100;
          return (
            <View
              key={goal.name}
              style={[
                styles.goalCard,
                {
                  backgroundColor: theme.card,
                  borderColor: theme.border,
                },
              ]}
            >
              <View style={styles.goalHeader}>
                <View style={styles.goalInfo}>
                  <Feather name={goal.icon as any} size={20} color={theme.neonBlue} />
                  <ThemedText style={styles.goalName}>{goal.name}</ThemedText>
                </View>
                <ThemedText style={styles.goalPercentage}>{Math.round(progress)}%</ThemedText>
              </View>
              <View style={styles.progressBar}>
                <View
                  style={[
                    styles.progressFill,
                    {
                      width: `${progress}%`,
                      backgroundColor: theme.neonBlue,
                    },
                  ]}
                />
              </View>
              <View style={styles.goalValues}>
                <ThemedText style={styles.goalValue}>
                  {goal.current.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </ThemedText>
                <ThemedText style={styles.goalValue}>
                  {goal.target.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </ThemedText>
              </View>
            </View>
          );
        })}
      </ScreenScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: Spacing.md,
    marginTop: Spacing.lg,
  },
  summaryGrid: {
    flexDirection: "row",
    gap: Spacing.md,
    marginBottom: Spacing.lg,
  },
  summaryCard: {
    flex: 1,
    padding: Spacing.cardPadding,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    alignItems: "center",
  },
  summaryValue: {
    fontSize: 20,
    fontWeight: "700",
    marginTop: Spacing.sm,
  },
  summaryLabel: {
    fontSize: 12,
    opacity: 0.6,
    marginTop: Spacing.xs,
  },
  categoryItem: {
    padding: Spacing.cardPadding,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    marginBottom: Spacing.md,
  },
  categoryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.sm,
  },
  categoryInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: "600",
  },
  categoryAmount: {
    fontSize: 16,
    fontWeight: "700",
  },
  progressBar: {
    height: 8,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 4,
  },
  goalCard: {
    padding: Spacing.cardPadding,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    marginBottom: Spacing.md,
  },
  goalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.sm,
  },
  goalInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
  },
  goalName: {
    fontSize: 16,
    fontWeight: "600",
  },
  goalPercentage: {
    fontSize: 16,
    fontWeight: "700",
  },
  goalValues: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: Spacing.sm,
  },
  goalValue: {
    fontSize: 14,
    opacity: 0.7,
  },
});
