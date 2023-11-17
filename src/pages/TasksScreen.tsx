import React from 'react';
import {View, StyleSheet} from 'react-native';
import Body from '../components/Body';
import {colors} from '../theme/colorTheme';
import TaskItem from '../components/TaskItem';

export const TasksScreen = () => {
  const tas = {title: 'gfvsjghvfjsv', description: 'weewvvn  fjfkbf bf web'};
  return (
    <>
      <View style={styles.container}>
        <TaskItem task={tas} />
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
  },
});
