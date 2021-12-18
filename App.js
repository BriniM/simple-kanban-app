// import { StatusBar } from 'expo-status-bar';
import React from "react";
import {
  StyleSheet,
} from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "./HomeScreen";
import { ModTache } from "./ModTache";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Taches" component={HomeScreen} />
        <Stack.Screen name="ModTache" component={ModTache} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export const appStyles = StyleSheet.create({
  container: {
    paddingTop: 40,
    backgroundColor: "#F0F1F2",
  },
  title: {
    fontSize: 24,
    fontWeight: 500,
    color: "#5685FF",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 18,
  },
  item: {
    fontSize: 12,
    color: "#686868",
    marginLeft: 40,
    paddingTop: 8,
    paddingBottom: 8,
  },
  typeTache: {
    color: "#5685FF",
    fontSize: 14,
    marginLeft: 32,
    marginBottom: 4,
  },
  input: {
    backgroundColor: 'white',
    borderColor: "#F0F1F2",
    marginTop: 12,
    marginBottom: 12,
    marginLeft: 30,
    marginRight: 30,
    paddingTop: 10,
    paddingLeft: 10,
    paddingBottom: 10,
    fontSize: 10,
    borderRadius: 5
  }
});

export const ETATS = {
  0: "En attente",
  1: "En cours",
  2: "Terminé",
  3: "Annulé",
};

export const tasksData = [
  {
    tasksType: ETATS[0],
    data: [{ id: 1, title: "Task 1", duree: "1h" }],
  },
  {
    tasksType: ETATS[1],
    data: [{ id: 2, title: "Task 2", duree: "2h" }],
  },
  {
    tasksType: ETATS[2],
    data: [{ id: 3, title: "Task 3", duree: "3h" }],
  },
  {
    tasksType: ETATS[3],
    data: [{ id: 4, title: "Task 4", duree: "4h" }],
  },
];