import React, { useContext, useEffect, useState } from "react";
import { Text, View, SectionList, SafeAreaView } from "react-native";

import { FAB } from 'react-native-elements';

import { AppContext, appStyles } from "./App";

function TaskItem(props) {
  let { Item, Section, Navigation } = props;
  return (
    <Text
      style={appStyles.item}
      onPress={() => Navigation.navigate("Modifier Tache", { Item, Section })}
    >
      {Item.title}
    </Text>
  );
}
function TaskCategory(props) {
  let { TasksType } = props;
  return <Text style={appStyles.typeTache}>{TasksType}</Text>;
}

export const isEmpty = function(obj) 
{
    for(var key in obj) 
    {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

export const HomeScreen = ({ navigation }) => {
  let { tasksData } = useContext(AppContext);
  let [isInit, setIsInit] = useState(true);

  useEffect(() => {
    if (isInit) {
      setIsInit(false);
    } else {
      // update the DB
    }
  }, [tasksData]);

  return (
    <View style={appStyles.container}>
      <SafeAreaView>
        {isEmpty(tasksData) ? (
          <Text>Pas de taches</Text>
        ) : (
          <SectionList
            sections={tasksData}
            keyExtractor={(item) => item.id}
            renderItem={({ item, section }) => (
              <TaskItem Item={item} Section={section} Navigation={navigation} />
            )}
            renderSectionHeader={({ section: { tasksType } }) => (
              <TaskCategory TasksType={tasksType} />
            )}
          />
        )}
      </SafeAreaView>
      <FAB title="+" style={{position: "absolute", top: 40, right: 20}}
          onPress={() => navigation.navigate("Ajouter Tache")}      
      />
    </View>
  );
};
