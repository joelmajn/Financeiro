import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { BalanceCard } from "@/components/BalanceCard";
import { ScreenScrollView } from "@/components/ScreenScrollView";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, BorderRadius } from "@/constants/theme";
import { useData } from "@/contexts/DataContext";

export default function ReportsScreen() {
  const { theme } = useTheme();
  const { incomes, variableExpenses, fixedExpenses, goals } = useData();

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const monthlyIncome = incomes
    .filter((inc) => {
      const date = new Date(inc.date);
      return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
    })
    .reduce((sum, inc) => sum + inc.amount, 0);

  const monthlyVariableExpenses = variableExpenses
    .filter((exp) => {
      const date = new Date(exp.date);
      return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
    })
    .reduce((sum, exp) => sum + exp.amount, 0);

  const monthlyFixedExpenses = fixedExpenses.reduce((sum, exp) => sum + exp.amount, 0);
  const monthlyExpenses = monthlyVariableExpenses + monthlyFixedExpenses;
  const balance = monthlyIncome - monthlyExpenses;

  const categoryData: { [key: string]: number } = {};
  variableExpenses
    .filter((exp) => {
      const date = new Date(exp.date);
      return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
    })
    .forEach((exp) => {
      categoryData[exp.category] = (categoryData[exp.category] || 0) + exp.amount;
    });

  const categoryIcons: { [key: string]: string } = {
    casa: "home",
    mercado: "shopping-bag",
    transporte: "truck",
    lazer: "coffee",
    saude: "heart",
    educacao: "book",
    outros: "more-horizontal",
  };

  const categoryColors = [
    theme.neonOrange,
    theme.neonBlue,
    theme.neonPurple,
    theme.neonGreen,
    theme.neonRed,
  ];

  const categories = Object.entries(categoryData).map(([name, amount], index) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1),
    amount,
    icon: categoryIcons[name] || "more-horizontal",
    color: categoryColors[index % categoryColors.length],
  }));

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
