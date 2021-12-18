import React, { useEffect, useState } from "react";
import { Text, View, TextInput, Pressable} from "react-native";

import { appStyles } from "./App";
import { ETATS } from "./App";

export const ModTache = ({ navigation, route }) => {
  let [checked, setChecked] = useState(route.params.Section.tasksType);
  let [nomTache, setNomTache] = useState(route.params.Item.title);
  let [duree, setDuree] = useState(route.params.Item.duree);
  let [isInit, setIsInit] = useState(true);

  useEffect(() => {
    if (isInit) {
      setIsInit(false);
    } else {
      
    }

  }, [checked, nomTache, duree]);

  return (
    <View style={appStyles.container}>
      <Text style={appStyles.title}>Modification Tache</Text>

      <Text style={appStyles.typeTache}>Nom tache:</Text>
      <TextInput style={appStyles.input} value={nomTache} onChange={(e) => {
        setNomTache(e.target.value);
      }}/>

      <Text style={appStyles.typeTache}>Duree:</Text>
      <TextInput style={appStyles.input} value={duree} onChange={(e) => {
        setDuree(e.target.value);
      }}/>

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
    </View>
  );
};

function Dot(checked, key) {
  return <View
    style={{
      width: 11,
      height: 11,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: "#F0F1F2",
      backgroundColor: checked === ETATS[key] ? "#686868" : "white",
    }} />;
}