import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image, Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as SecureStore from "expo-secure-store";
import * as LocalAuthentication from "expo-local-authentication";
import { ThemedText } from "@/components/ThemedText";
import { PinInput } from "@/components/PinInput";
import { NumericKeypad } from "@/components/NumericKeypad";
import { Spacing } from "@/constants/theme";
import { useAuth } from "@/contexts/AuthContext";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function PinUnlockScreen() {
  const { unlockPin } = useAuth();
  const insets = useSafeAreaInsets();
  const [pin, setPin] = useState("");
  const [hasBiometricHardware, setHasBiometricHardware] = useState(false);

  useEffect(() => {
    checkBiometricAvailability();
  }, []);

  const checkBiometricAvailability = async () => {
    const compatible = await LocalAuthentication.hasHardwareAsync();
    const enrolled = await LocalAuthentication.isEnrolledAsync();
    setHasBiometricHardware(compatible && enrolled);
  };

  const handleBiometric = async () => {
    try {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: "Desbloquear NeoWallet",
        fallbackLabel: "Usar PIN",
      });

      if (result.success) {
        unlockPin();
      }
    } catch (error) {
      console.error("Biometric error:", error);
    }
  };

  const handlePinPress = async (value: string) => {
    if (pin.length < 6) {
      const newPin = pin + value;
      setPin(newPin);

      if (newPin.length === 6) {
        const storedPin = await SecureStore.getItemAsync("pin");

        if (newPin === storedPin) {
          setTimeout(() => {
            unlockPin();
          }, 300);
        } else {
          setTimeout(() => {
            Alert.alert("PIN incorreto", "Tente novamente");
            setPin("");
          }, 300);
        }
      }
    }
  };

  const handleDelete = () => {
    setPin(pin.slice(0, -1));
  };

  return (
    <LinearGradient colors={["#0A0E27", "#1A0A2E"]} style={styles.gradient}>
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
          <ThemedText style={styles.title}>Bem-vindo de volta</ThemedText>
          <ThemedText style={styles.subtitle}>
            Digite seu PIN para continuar
          </ThemedText>

          <PinInput length={6} filledCount={pin.length} />
        </View>

        <NumericKeypad
          onPress={handlePinPress}
          onDelete={handleDelete}
          showBiometric={hasBiometricHardware}
          onBiometric={handleBiometric}
        />
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
    width: 80,
    height: 80,
    marginBottom: Spacing.lg,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: Spacing.sm,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "rgba(255,255,255,0.7)",
    textAlign: "center",
    marginBottom: Spacing.xl,
  },
});
