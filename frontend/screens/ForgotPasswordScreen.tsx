import React, { useState } from "react";
import { StyleSheet, Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { ThemedText } from "@/components/ThemedText";
import { Input } from "@/components/Input";
import { PrimaryButton } from "@/components/PrimaryButton";
import { Spacing } from "@/constants/theme";
import { ScreenKeyboardAwareScrollView } from "@/components/ScreenKeyboardAwareScrollView";

export default function ForgotPasswordScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async () => {
    if (!email) return;

    setLoading(true);
    setTimeout(() => {
      Alert.alert(
        "Email enviado",
        "Verifique sua caixa de entrada para redefinir sua senha",
        [
          {
            text: "OK",
            onPress: () => navigation.goBack(),
          },
        ]
      );
      setLoading(false);
    }, 1000);
  };

  return (
    <LinearGradient colors={["#0A0E27", "#1A0A2E"]} style={styles.gradient}>
      <ScreenKeyboardAwareScrollView contentContainerStyle={styles.container}>
        <ThemedText style={styles.title}>Recuperar Senha</ThemedText>
        <ThemedText style={styles.subtitle}>
          Enviaremos um link para redefinir sua senha
        </ThemedText>

        <Input
          label="Email"
          placeholder="seu@email.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
        />

        <PrimaryButton
          title="Enviar Link"
          onPress={handleResetPassword}
          loading={loading}
          disabled={!email}
        />
      </ScreenKeyboardAwareScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    paddingHorizontal: Spacing.screenHorizontal,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: Spacing.sm,
  },
  subtitle: {
    fontSize: 16,
    color: "rgba(255,255,255,0.7)",
    marginBottom: Spacing.xl,
  },
});
