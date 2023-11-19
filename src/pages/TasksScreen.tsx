/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, StyleSheet, FlatList, Alert} from 'react-native';
import TaskItem from '../components/TaskItem';
import Button from '../components/Button';
import {useNavigation} from '@react-navigation/native';
import {RoutesNames} from '../navigation/RoutesNames';
import {useDispatch, useSelector} from 'react-redux';
import {getTasks} from '../store/tasks/selectors';
import Body from '../components/Body';
import {delTask, setReadyTask} from '../store/tasks/slice';
import {ITask} from '../store/tasks/types';

export const TasksScreen = () => {
  const navigation = useNavigation();
  const {tasks} = useSelector(getTasks);
  const dispatch = useDispatch();

  const comfirmReadyTask = (completeTask: ITask) => {
    dispatch(setReadyTask(completeTask));
  };
  const taskDelete = (delteTask: ITask) => {
    Alert.alert('Вы действительно хотите удалить задачу?', '', [
      {
        text: 'Да',
        onPress: () => dispatch(delTask(delteTask)),
        style: 'cancel',
      },
      {
        text: 'Отменить',
        style: 'cancel',
      },
    ]);
  };

  return (
    <>
      <View style={styles.container}>
        {tasks?.length >= 1 ? (
          <FlatList
            data={tasks}
            keyExtractor={(item: ITask) => item.id.toString()}
            maxToRenderPerBatch={5}
            style={{marginBottom: 35, marginTop: 16}}
            renderItem={({item}) => (
              <TaskItem
                comfirmReadyTask={comfirmReadyTask}
                taskDelete={taskDelete}
                task={item}
              />
            )}
          />
        ) : (
          <View style={styles.centerTitle}>
            <Body bold size={20}>
              Задач еще нет
            </Body>
          </View>
        )}
        <Button
          onPress={() => {
            //@ts-ignore
            navigation.navigate(RoutesNames.ADD_TASK);
          }}
          text="+ Новая задача"
          bottom
        />
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    justifyContent: 'center',
  },
  centerTitle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
