import React, { useContext } from "react";
import {
  Text,
  View,
  SectionList,
  SafeAreaView
} from "react-native";
import { AppContext, appStyles } from "./App";

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
  let { tasksData } = useContext(AppContext);

  return (
    <View style={appStyles.container}>
      <Text style={appStyles.title}>Liste des taches</Text>
      <SafeAreaView>
        <SectionList
          sections={tasksData}
          keyExtractor={(item) => item.id}
          renderItem={({ item, section }) => <TaskItem Item={item} Section={section} Navigation={navigation} />}
          renderSectionHeader={({ section: { tasksType } }) => (
            <TaskCategory TasksType={tasksType} />
          )} />
      </SafeAreaView>
    </View>
  );
};

