import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import TaskForm from '../components/TaskForm';
import {ITask} from '../store/tasks/types';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {editTask} from '../store/tasks/slice';

export const EditorTaskScreen = ({
  route,
}: RouteProp<{params: ITask}>): JSX.Element => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {data} = route.params;
  const [dateStart, setDateStart] = useState<Date>(data?.dateStart);
  const [dateEnd, setDateEnd] = useState<Date>(data?.dateEnd);

  const handleChangeDateStart = (childValue: Date) => {
    setDateStart(childValue);
  };
  const handleChangeDateEnd = (childValue: Date) => {
    setDateEnd(childValue);
  };
  const submitTask = (task: ITask) => {
    console.log('task', task);

    const editedTask: ITask = {
      title: task.title,
      description: task.description,
      dateStart: dateStart,
      dateEnd: dateEnd,
      id: data?.id,
      completly: data?.completly,
    };
    dispatch(editTask(editedTask));
    navigation.goBack();
    console.log('editTask', editedTask);
  };
  return (
    <>
      <View style={styles.container}>
        <TaskForm
          initialValues={data}
          submitTask={submitTask}
          isEdit
          onChangeDateStart={handleChangeDateStart}
          onChangeDateEnd={handleChangeDateEnd}
        />
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 18,
  },
});
