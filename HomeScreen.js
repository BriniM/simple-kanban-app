import React from "react";
import {
  Text,
  View,
  SectionList,
  SafeAreaView
} from "react-native";
import { appStyles, tasksData } from "./App";

function TaskItem(props) {
  let { Item, Section, Navigation } = props;
  return (
    <Text
      style={appStyles.item}
      onPress={() => Navigation.navigate("ModTache", { Item, Section })}
    >
      {Item.title}
    </Text>
  );
}
function TaskCategory(props) {
  let { TasksType } = props;
  return <Text style={appStyles.typeTache}>{TasksType}</Text>;
}

export const HomeScreen = ({ navigation }) => {
  return (
    <View style={appStyles.container}>
      <Text style={appStyles.title}>Liste des taches</Text>
      <SafeAreaView>
        <SectionList
          sections={tasksData}
          keyExtractor={(item, index) => item.id}
          renderItem={({ item, section }) => <TaskItem Item={item} Section={section} Navigation={navigation} />}
          renderSectionHeader={({ section: { tasksType } }) => (
            <TaskCategory TasksType={tasksType} />
          )} />
      </SafeAreaView>
    </View>
  );
};

