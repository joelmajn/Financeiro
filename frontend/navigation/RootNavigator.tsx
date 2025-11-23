import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthStackNavigator from "./AuthStackNavigator";
import OnboardingScreen from "@/screens/OnboardingScreen";
import PinUnlockScreen from "@/screens/PinUnlockScreen";
import MainTabNavigator from "./MainTabNavigator";
import AddTransactionScreen from "@/screens/AddTransactionScreen";
import AddAccountScreen from "@/screens/AddAccountScreen";
import AddCardScreen from "@/screens/AddCardScreen";
import AddGoalScreen from "@/screens/AddGoalScreen";
import AddFixedExpenseScreen from "@/screens/AddFixedExpenseScreen";
import { useAuth } from "@/contexts/AuthContext";

export type RootStackParamList = {
  Auth: undefined;
  Onboarding: undefined;
  PinUnlock: undefined;
  Main: undefined;
  AddTransaction: undefined;
  AddAccount: undefined;
  AddCard: undefined;
  AddGoal: undefined;
  AddFixedExpense: undefined;
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
          options={{ title: "Nova Transação" }}
        />
        <Stack.Screen
          name="AddAccount"
          component={AddAccountScreen}
          options={{ title: "Nova Conta" }}
        />
        <Stack.Screen
          name="AddCard"
          component={AddCardScreen}
          options={{ title: "Novo Cartão" }}
        />
        <Stack.Screen
          name="AddGoal"
          component={AddGoalScreen}
          options={{ title: "Nova Meta" }}
        />
        <Stack.Screen
          name="AddFixedExpense"
          component={AddFixedExpenseScreen}
          options={{ title: "Nova Despesa Fixa" }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}
