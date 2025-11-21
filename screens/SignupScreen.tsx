import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ThemedText } from "@/components/ThemedText";
import { Input } from "@/components/Input";
import { PrimaryButton } from "@/components/PrimaryButton";
import { Spacing } from "@/constants/theme";
import { AuthStackParamList } from "@/navigation/AuthStackNavigator";
import { ScreenKeyboardAwareScrollView } from "@/components/ScreenKeyboardAwareScrollView";

type SignupScreenProp = NativeStackNavigationProp<
  AuthStackParamList,
  "Signup"
>;

export default function SignupScreen() {
  const navigation = useNavigation<SignupScreenProp>();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (!name || !email || !password || password !== confirmPassword) return;

    setLoading(true);
    setTimeout(() => {
      navigation.navigate("PinSetup");
      setLoading(false);
    }, 1000);
  };

  const isFormValid =
    name && email && password && password === confirmPassword;

  return (
    <LinearGradient colors={["#0A0E27", "#1A0A2E"]} style={styles.gradient}>
      <ScreenKeyboardAwareScrollView contentContainerStyle={styles.container}>
        <ThemedText style={styles.title}>Criar Conta</ThemedText>
        <ThemedText style={styles.subtitle}>
          Preencha seus dados para começar
        </ThemedText>

        <Input
          label="Nome Completo"
          placeholder="Seu nome"
          value={name}
          onChangeText={setName}
          autoCapitalize="words"
          autoComplete="name"
        />

        <Input
          label="Email"
          placeholder="seu@email.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
        />

        <Input
          label="Senha"
          placeholder="Crie uma senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoComplete="password-new"
        />

        <Input
          label="Confirmar Senha"
          placeholder="Digite a senha novamente"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          error={
            confirmPassword && password !== confirmPassword
              ? "As senhas não coincidem"
              : undefined
          }
        />

        <PrimaryButton
          title="Criar Conta"
          onPress={handleSignup}
          loading={loading}
          disabled={!isFormValid}
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
