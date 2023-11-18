/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import TaskItem from '../components/TaskItem';
import Button from '../components/Button';
import {useNavigation} from '@react-navigation/native';
import {RoutesNames} from '../navigation/RoutesNames';
import {useSelector} from 'react-redux';
import {getTasks} from '../store/tasks/selectors';

export const TasksScreen = () => {
  const navigation = useNavigation();
  const {tasks} = useSelector(getTasks);
  const tas = [
    {
      id: 2,
      title: 'gfvsjghvfjsv',
      description:
        'weewvvn  fjfkbf bf web qtdd dytq eu  iy g iu euh ieuh ewi heiefhiwehf   fewuif hwefkjfb b fb wj bfe',
      dateStart: '2023-11-29',
      dateEnd: '2023-11-02',
      completly: false,
    },
    {
      id: 1,
      title: 'gfvsjghvfjsv',
      description:
        'weewvvn  fjfkbf bf web qtdd dytq eu  iy g iu euh ieuh ewi heiefhiwehf   fewuif hwefkjfb b fb wj bfe',
      dateStart: '2023-11-29',
      dateEnd: '2023-11-02',
      completly: true,
    },
    {
      id: 2,
      title: 'Hi jvdvhv ghvfjsv',
      description:
        'weewvvn  fjfkbf bf web qtdd dytq eu  iy g iu euh ieuh ewi heiefhiwehf   fewuif hwefkjfb b fb wj bfe',
      dateStart: '2023-11-29',
      dateEnd: '2023-11-02',
      completly: true,
    },
  ];
  console.log('tasks', tasks);

  return (
    <>
      <View style={styles.container}>
        <FlatList
          data={tasks}
          keyExtractor={item => item.id}
          style={{marginBottom: 35}}
          renderItem={({item}) => <TaskItem task={item} />}
        />
        {/* <View style={styles.bottom}> */}
        <Button
          onPress={() => {
            //@ts-ignore
            navigation.navigate(RoutesNames.ADD_TASK);
          }}
          text="+ Новая задача"
          bottom
        />
        {/* </View> */}
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
