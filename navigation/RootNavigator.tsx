import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthStackNavigator from "./AuthStackNavigator";
import OnboardingScreen from "@/screens/OnboardingScreen";
import PinUnlockScreen from "@/screens/PinUnlockScreen";
import MainTabNavigator from "./MainTabNavigator";
import AddTransactionScreen from "@/screens/AddTransactionScreen";
import { useAuth } from "@/contexts/AuthContext";

export type RootStackParamList = {
  Auth: undefined;
  Onboarding: undefined;
  PinUnlock: undefined;
  Main: undefined;
  AddTransaction: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  const { isAuthenticated, hasCompletedOnboarding, isPinLocked } = useAuth();

  if (!isAuthenticated) {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Auth" component={AuthStackNavigator} />
      </Stack.Navigator>
    );
  }

  if (!hasCompletedOnboarding) {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      </Stack.Navigator>
    );
  }

  if (isPinLocked) {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="PinUnlock" component={PinUnlockScreen} />
      </Stack.Navigator>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Main" component={MainTabNavigator} />
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen
          name="AddTransaction"
          component={AddTransactionScreen}
          options={{ title: "Adicionar" }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}
