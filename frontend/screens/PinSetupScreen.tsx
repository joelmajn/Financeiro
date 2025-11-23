import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as SecureStore from "expo-secure-store";
import { ThemedText } from "@/components/ThemedText";
import { PinInput } from "@/components/PinInput";
import { NumericKeypad } from "@/components/NumericKeypad";
import { Spacing } from "@/constants/theme";
import { useAuth } from "@/contexts/AuthContext";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function PinSetupScreen() {
  const { login } = useAuth();
  const insets = useSafeAreaInsets();
  const [pin, setPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [isConfirming, setIsConfirming] = useState(false);

  const handlePinPress = (value: string) => {
    if (isConfirming) {
      if (confirmPin.length < 6) {
        const newPin = confirmPin + value;
        setConfirmPin(newPin);

        if (newPin.length === 6) {
          if (newPin === pin) {
            SecureStore.setItemAsync("pin", pin);
            setTimeout(() => {
              login();
            }, 500);
          } else {
            setTimeout(() => {
              setConfirmPin("");
              setPin("");
              setIsConfirming(false);
            }, 500);
          }
        }
      }
    } else {
      if (pin.length < 6) {
        const newPin = pin + value;
        setPin(newPin);

        if (newPin.length === 6) {
          setTimeout(() => {
            setIsConfirming(true);
          }, 300);
        }
      }
    }
  };

  const handleDelete = () => {
    if (isConfirming) {
      setConfirmPin(confirmPin.slice(0, -1));
    } else {
      setPin(pin.slice(0, -1));
    }
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
          <ThemedText style={styles.title}>
            {isConfirming ? "Confirme seu PIN" : "Crie um PIN"}
          </ThemedText>
          <ThemedText style={styles.subtitle}>
            {isConfirming
              ? "Digite novamente para confirmar"
              : "Use 4 a 6 dígitos para proteger sua conta"}
          </ThemedText>

          <PinInput
            length={6}
            filledCount={isConfirming ? confirmPin.length : pin.length}
          />
        </View>

        <NumericKeypad onPress={handlePinPress} onDelete={handleDelete} />
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
