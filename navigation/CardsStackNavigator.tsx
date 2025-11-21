import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CardsScreen from "@/screens/CardsScreen";
import { getCommonScreenOptions } from "./screenOptions";

export type CardsStackParamList = {
  Cards: undefined;
};

const Stack = createNativeStackNavigator<CardsStackParamList>();

export default function CardsStackNavigator() {
  return (
    <Stack.Navigator screenOptions={getCommonScreenOptions()}>
      <Stack.Screen
        name="Cards"
        component={CardsScreen}
        options={{
          title: "Cartões",
        }}
      />
    </Stack.Navigator>
  );
}
