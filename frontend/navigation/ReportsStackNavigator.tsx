import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ReportsScreen from "@/screens/ReportsScreen";
import { getCommonScreenOptions } from "./screenOptions";

export type ReportsStackParamList = {
  Reports: undefined;
};

const Stack = createNativeStackNavigator<ReportsStackParamList>();

export default function ReportsStackNavigator() {
  return (
    <Stack.Navigator screenOptions={getCommonScreenOptions()}>
      <Stack.Screen
        name="Reports"
        component={ReportsScreen}
        options={{
          title: "Relatórios",
        }}
      />
    </Stack.Navigator>
  );
}
