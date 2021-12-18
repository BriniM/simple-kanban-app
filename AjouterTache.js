import React, { useState, useContext } from "react";
import { Text, View, TextInput, Pressable, Button } from "react-native";

import { appStyles, AppContext } from "./App";
import { ETATS, adaptTasksData } from "./App";

import * as DB from "./DB";

export const AjouterTache = ({ navigation, route }) => {
  let [checked, setChecked] = useState(ETATS[0]);
  let [nomTache, setNomTache] = useState("");
  let [duree, setDuree] = useState("");
  let { tasksData, setTasksData } = useContext(AppContext);

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
        title="Ajouter Tache"
        onPress={() => {
          DB.createTask({ title: nomTache, duree: duree }, getKeyByValue(ETATS, checked))
          .then(dbRespo => {
            DB.getTasks().then(tasks => {
              setTasksData(adaptTasksData(ETATS, tasks));
            })
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

// TODO
function AppendTask(tasksArray, newTask) {

}

function getKeyByValue(object, value) {
  return Object.keys(object).find(key => object[key] === value);
}
