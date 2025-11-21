import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ThemedText } from "@/components/ThemedText";
import { PrimaryButton } from "@/components/PrimaryButton";
import { SecondaryButton } from "@/components/SecondaryButton";
import { Spacing } from "@/constants/theme";
import { AuthStackParamList } from "@/navigation/AuthStackNavigator";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type WelcomeScreenProp = NativeStackNavigationProp<
  AuthStackParamList,
  "Welcome"
>;

export default function WelcomeScreen() {
  const navigation = useNavigation<WelcomeScreenProp>();
  const insets = useSafeAreaInsets();

  return (
    <LinearGradient
      colors={["#0A0E27", "#1A0A2E"]}
      style={styles.gradient}
    >
      <View
        style={[
          styles.container,
          {
            paddingTop: insets.top + Spacing.xl,
            paddingBottom: insets.bottom + Spacing.xl,
          },
        ]}
      >
        <View style={styles.content}>
          <Image
            source={require("@/assets/images/icon.png")}
            style={styles.logo}
            resizeMode="contain"
          />
          <ThemedText style={styles.title}>NeoWallet</ThemedText>
          <ThemedText style={styles.subtitle}>
            Controle suas finanças{"\n"}de forma inteligente
          </ThemedText>
        </View>

        <View style={styles.buttonContainer}>
          <PrimaryButton
            title="Criar Conta"
            onPress={() => navigation.navigate("Signup")}
          />
          <View style={styles.spacing} />
          <SecondaryButton
            title="Fazer Login"
            onPress={() => navigation.navigate("Login")}
          />
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: Spacing.screenHorizontal,
    justifyContent: "space-between",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: Spacing.lg,
  },
  title: {
    fontSize: 42,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: Spacing.sm,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    color: "rgba(255,255,255,0.7)",
    textAlign: "center",
    lineHeight: 26,
  },
  buttonContainer: {
    width: "100%",
  },
  spacing: {
    height: Spacing.md,
  },
});
