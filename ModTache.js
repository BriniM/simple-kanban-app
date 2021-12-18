import React, { useEffect, useState, useContext } from "react";
import { Text, Button, View, TextInput, Pressable } from "react-native";

import { appStyles, AppContext } from "./App";
import { ETATS } from "./App";
import * as DB from "./DB";

export const ModTache = ({ navigation, route }) => {
  let [checked, setChecked] = useState(route.params.Section.tasksType);
  let [nomTache, setNomTache] = useState(route.params.Item.title);
  let [duree, setDuree] = useState(route.params.Item.duree);
  let [isInit, setIsInit] = useState(true);
  let { tasksData, setTasksData } = useContext(AppContext);

  useEffect(() => {
    if (isInit) {
      setIsInit(false);
    } else {
      let newTasksData = [...tasksData];
      newTasksData = updateTasks(
        newTasksData,
        route,
        nomTache,
        duree,
        checked,
        tasksData
      );
      setTasksData(newTasksData);
    }
  }, [checked, nomTache, duree]);

  return (
    <View style={appStyles.container}>
      <Text style={appStyles.typeTache}>Nom tache:</Text>
      <TextInput
        style={appStyles.input}
        value={nomTache}
        onChangeText={(text) => {
          setNomTache(text);
        }}
      />

      <Text style={appStyles.typeTache}>Duree:</Text>
      <TextInput
        style={appStyles.input}
        value={duree}
        onChangeText={(text) => {
          setDuree(text);
        }}
      />

      <Text style={appStyles.typeTache}>Etat:</Text>
      <View style={{ flexDirection: "column", marginLeft: 40 }}>
        {Object.keys(ETATS).map((key) => (
          <Pressable
            key={key}
            onPress={() => {
              setChecked(ETATS[key]);
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 8,
              }}
            >
              {Dot(checked, key)}
              <Text
                style={{
                  marginLeft: 8,
                  fontSize: 12,
                  color: "#686868",
                }}
              >
                {ETATS[key]}
              </Text>
            </View>
          </Pressable>
        ))}
      </View>
      <Button
        title="Supprimer Tache"
        onPress={() => {
          DB.deleteTask({ id: route.params.Item.id }).then(() => {
            let newTasks = [...tasksData];
            let section = newTasks.find((section) => section.data.find((item) => item.id === route.params.Item.id));
            section.data = section.data.filter((item) => item.id !== route.params.Item.id);

            setTasksData(newTasks);
          })
        }}
      />
    </View>
  );
};

function Dot(checked, key) {
  return (
    <View
      style={{
        width: 11,
        height: 11,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#F0F1F2",
        backgroundColor: checked === ETATS[key] ? "#686868" : "white",
      }}
    />
  );
}

function updateTasks(newTasksData, route, nomTache, duree, checked, tasksData) {
  // find current section
  let section = newTasksData.find((section) =>
    section.data.find((item) => item.id === route.params.Item.id)
  );
  // find current task, update title and duree
  let task = section.data.find((item) => item.id === route.params.Item.id);
  task.title = nomTache;
  task.duree = duree;

  // if the task type has changed
  newTasksData = handleTaskTypeChange(section, checked, task, newTasksData, tasksData);
  return newTasksData;
}

function handleTaskTypeChange(section, currentlyCheckedCategory, task, newTasksData, tasksData) {
  if (section.tasksType !== currentlyCheckedCategory) {
    section.data = section.data.filter((dTask) => dTask.id != task.id);
    let newSection = newTasksData.find(
      (section) => section.tasksType === currentlyCheckedCategory
    );
    if (newSection === undefined) {
      newSection = {
        tasksType: currentlyCheckedCategory,
        data: [task],
      };
      newTasksData.push(newSection);
    } else {
      newSection.data.push(task);
    }

    if (section.data.length === 0) {
      newTasksData = tasksData.filter((tSection) => tSection !== section);
    }
  }
  return newTasksData;
}

