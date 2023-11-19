import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import moment from 'moment';
import {ITask} from '../store/tasks/types';
import {addTask} from '../store/tasks/slice';
import TaskForm from '../components/TaskForm';

export const NewTaskScreen = (): JSX.Element => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  moment.locale('ru');
  const initialValues: ITask = {
    id: 0,
    title: '',
    description: '',
  };

  const [dateStart, setDateStart] = useState<Date>(new Date());
  const [dateEnd, setDateEnd] = useState<Date>(new Date());

  const handleChangeDateStart = (childValue: Date) => {
    setDateStart(childValue);
  };
  const handleChangeDateEnd = (childValue: Date) => {
    setDateEnd(childValue);
  };

  const submitTask = (data: ITask) => {
    const id = new Date().valueOf();
    const newTask: ITask = {
      title: data.title,
      description: data.description,
      dateStart: dateStart,
      dateEnd: dateEnd,
      id: id,
      completly: false,
    };
    dispatch(addTask(newTask));
    navigation.goBack();
  };

  return (
    <>
      <View style={styles.container}>
        <TaskForm
          initialValues={initialValues}
          submitTask={submitTask}
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
