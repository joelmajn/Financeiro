import React, { useState } from "react";
import { StyleSheet, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ThemedText } from "@/components/ThemedText";
import { Input } from "@/components/Input";
import { PrimaryButton } from "@/components/PrimaryButton";
import { Spacing } from "@/constants/theme";
import { AuthStackParamList } from "@/navigation/AuthStackNavigator";
import { useAuth } from "@/contexts/AuthContext";
import { ScreenKeyboardAwareScrollView } from "@/components/ScreenKeyboardAwareScrollView";

type LoginScreenProp = NativeStackNavigationProp<AuthStackParamList, "Login">;

export default function LoginScreen() {
  const navigation = useNavigation<LoginScreenProp>();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) return;

    setLoading(true);
    setTimeout(() => {
      login();
      setLoading(false);
    }, 1000);
  };

  return (
    <LinearGradient colors={["#0A0E27", "#1A0A2E"]} style={styles.gradient}>
      <ScreenKeyboardAwareScrollView contentContainerStyle={styles.container}>
        <ThemedText style={styles.title}>Bem-vindo de volta</ThemedText>
        <ThemedText style={styles.subtitle}>
          Faça login para continuar
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

        <Input
          label="Senha"
          placeholder="Digite sua senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoComplete="password"
        />

        <Pressable onPress={() => navigation.navigate("ForgotPassword")}>
          <ThemedText style={styles.forgotPassword}>
            Esqueceu a senha?
          </ThemedText>
        </Pressable>

        <PrimaryButton
          title="Entrar"
          onPress={handleLogin}
          loading={loading}
          disabled={!email || !password}
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
  forgotPassword: {
    color: "#00D9FF",
    textAlign: "right",
    marginBottom: Spacing.lg,
    marginTop: -Spacing.sm,
  },
});
