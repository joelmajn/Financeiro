import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DashboardScreen from "@/screens/DashboardScreen";
import { getCommonScreenOptions } from "./screenOptions";

export type DashboardStackParamList = {
  Dashboard: undefined;
};

const Stack = createNativeStackNavigator<DashboardStackParamList>();

export default function DashboardStackNavigator() {
  return (
    <Stack.Navigator screenOptions={getCommonScreenOptions()}>
      <Stack.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          title: "Início",
        }}
      />
    </Stack.Navigator>
  );
}
