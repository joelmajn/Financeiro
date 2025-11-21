import React, { useState } from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { FAB } from "@/components/FAB";
import { ScreenScrollView } from "@/components/ScreenScrollView";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, BorderRadius } from "@/constants/theme";
import { CreditCard } from "@/types";

export default function CardsScreen() {
  const { theme } = useTheme();
  const [cards] = useState<CreditCard[]>([
    {
      id: "1",
      name: "Nubank",
      bank: "Nubank",
      brand: "Mastercard",
      limit: 5000,
      closingDay: 15,
      dueDay: 25,
      currentBalance: 1850.50,
      createdAt: new Date().toISOString(),
    },
    {
      id: "2",
      name: "Itaú Personnalité",
      bank: "Itaú",
      brand: "Visa",
      limit: 8000,
      closingDay: 10,
      dueDay: 20,
      currentBalance: 520.00,
      createdAt: new Date().toISOString(),
    },
  ]);

  const calculateUsagePercent = (used: number, limit: number) => {
    return (used / limit) * 100;
  };

  return (
    <ThemedView style={styles.container}>
      <ScreenScrollView>
        <ThemedText style={styles.sectionTitle}>Meus Cartões</ThemedText>

        {cards.map((card, index) => {
          const usagePercent = calculateUsagePercent(
            card.currentBalance,
            card.limit
          );
          const availableLimit = card.limit - card.currentBalance;

          return (
            <Pressable
              key={card.id}
              style={({ pressed }) => [pressed && styles.pressed]}
            >
              <LinearGradient
                colors={
                  index === 0
                    ? ["#8B5CF6", "#6366F1"]
                    : ["#0EA5E9", "#06B6D4"]
                }
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.cardContainer}
              >
                <View style={styles.cardHeader}>
                  <View>
                    <ThemedText style={styles.cardBank}>{card.bank}</ThemedText>
                    <ThemedText style={styles.cardBrand}>
                      {card.brand}
                    </ThemedText>
                  </View>
                  <Feather name="credit-card" size={32} color="rgba(255,255,255,0.8)" />
                </View>

                <View style={styles.cardBalance}>
                  <ThemedText style={styles.cardBalanceLabel}>
                    Fatura Atual
                  </ThemedText>
                  <ThemedText style={styles.cardBalanceValue}>
                    {card.currentBalance.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </ThemedText>
                </View>

                <View style={styles.progressContainer}>
                  <View style={styles.progressBar}>
                    <View
                      style={[
                        styles.progressFill,
                        {
                          width: `${Math.min(usagePercent, 100)}%`,
                          backgroundColor:
                            usagePercent > 80
                              ? theme.neonRed
                              : theme.neonGreen,
                        },
                      ]}
                    />
                  </View>
                  <View style={styles.limitInfo}>
                    <ThemedText style={styles.limitText}>
                      Disponível: {availableLimit.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </ThemedText>
                    <ThemedText style={styles.limitText}>
                      Limite: {card.limit.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </ThemedText>
                  </View>
                </View>

                <ThemedText style={styles.dueDate}>
                  Vencimento: dia {card.dueDay}
                </ThemedText>
              </LinearGradient>
            </Pressable>
          );
        })}
      </ScreenScrollView>

      <FAB onPress={() => {}} />
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
  },
  cardContainer: {
    padding: Spacing.lg,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.md,
    minHeight: 200,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: Spacing.lg,
  },
  cardBank: {
    fontSize: 20,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  cardBrand: {
    fontSize: 14,
    color: "rgba(255,255,255,0.8)",
    marginTop: Spacing.xs,
  },
  cardBalance: {
    marginBottom: Spacing.md,
  },
  cardBalanceLabel: {
    fontSize: 12,
    color: "rgba(255,255,255,0.8)",
    marginBottom: Spacing.xs,
  },
  cardBalanceValue: {
    fontSize: 28,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  progressContainer: {
    marginTop: Spacing.md,
  },
  progressBar: {
    height: 8,
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 4,
    overflow: "hidden",
    marginBottom: Spacing.sm,
  },
  progressFill: {
    height: "100%",
    borderRadius: 4,
  },
  limitInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  limitText: {
    fontSize: 12,
    color: "rgba(255,255,255,0.9)",
  },
  dueDate: {
    fontSize: 12,
    color: "rgba(255,255,255,0.8)",
    marginTop: Spacing.sm,
  },
  pressed: {
    opacity: 0.9,
  },
});
