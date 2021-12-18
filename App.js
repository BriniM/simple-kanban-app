import { StatusBar } from 'expo-status-bar';
import React, { createContext, useEffect, useState } from "react";
import { StyleSheet } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { HomeScreen } from "./HomeScreen";
import { ModTache } from "./ModTache";

import * as DB from "./DB";
import { AjouterTache } from './AjouterTache';

export const adaptTasksData = (ETATS, tasks) => {
  let taskTypes = Object.keys(ETATS);
  let adaptedTasks = [];

  taskTypes.forEach(taskType => {
    let sectionData = tasks.filter(task => taskType == task["type_tache"]);
    if (sectionData.length > 0) {
      adaptedTasks.push({
        tasksType: ETATS[taskType],
        data: sectionData.map(task => {
          return {
            title: task.title,
            duree: task.duree,
            id: task.id,
          }
        })
      })  
    }
  })

  return adaptedTasks;
}

const Stack = createNativeStackNavigator();

export const AppContext = createContext({
  tasksData: [],
  setTasksData: () => {},
});

export default function App() {
  let [tasksData, setTasksData] = useState({});

  useEffect(() => {
    DB.getTasks().then(tasks => {
      setTasksData(adaptTasksData(ETATS, tasks));
    })
  }, [])

  return (
    <AppContext.Provider value={{ tasksData, setTasksData }}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Taches" component={HomeScreen} />
          <Stack.Screen name="Modifier Tache" component={ModTache} />
          <Stack.Screen name="Ajouter Tache" component={AjouterTache} />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
    </AppContext.Provider>
  );
}

export const appStyles = StyleSheet.create({
  container: {
    paddingTop: 40,
    backgroundColor: "#F0F1F2",
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
    backgroundColor: "white",
    borderColor: "#F0F1F2",
    marginTop: 12,
    marginBottom: 12,
    marginLeft: 30,
    marginRight: 30,
    paddingTop: 10,
    paddingLeft: 10,
    paddingBottom: 10,
    fontSize: 10,
    borderRadius: 5,
  },
});

export const ETATS = {
  0: "En attente",
  1: "En cours",
  2: "Terminé",
  3: "Annulé",
};

const devTasksData = [
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
