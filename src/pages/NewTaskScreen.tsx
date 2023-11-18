import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import Body from '../components/Body';
import {Formik} from 'formik';
import {ITask} from '../store/tasks/types';
import FormikInput from '../components/FormikInput';
import Button from '../components/Button';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import {validator, required} from '../utils/validator';
import {useDispatch, useSelector} from 'react-redux';

import {addTask} from '../store/tasks/slice';
import {getTasks} from '../store/tasks/selectors';

export const NewTaskScreen = () => {
  const dispatch = useDispatch();
  const tasksState = useSelector(getTasks);
  moment.locale('ru');
  const initialValues: ITask = {
    title: '',
    description: '',
  };
  console.log('tasksState', tasksState);

  const [dateStart, setDateStart] = useState(new Date());
  const [dateEnd, setDateEnd] = useState(new Date());
  const [openDate, setOpenDate] = useState(false);
  const [openDateEnd, setOpenDateEnd] = useState(false);
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
    console.log('newTask', newTask);
  };

  return (
    <>
      <View style={styles.container}>
        <Formik initialValues={initialValues} onSubmit={submitTask}>
          {({handleSubmit}) => (
            <>
              <View style={styles.formPadding}>
                <FormikInput
                  name="title"
                  label="Название задачи"
                  placeholder="Название задачи"
                  position="top"
                  keyboardType="email-address"
                  validate={validator(required)}
                />
                <FormikInput
                  name="description"
                  label="Описание задачи"
                  placeholder="..."
                  position="bottom"
                  keyboardType="email-address"
                  numberOfLines={5}
                />
              </View>

              <View style={styles.dateRow}>
                <View>
                  <Body>Дата начала</Body>
                  <Body>{moment(dateStart).format('LL')}</Body>
                </View>

                <Button text="Изменть" onPress={() => setOpenDate(true)} />
              </View>
              <View style={styles.dateRow}>
                <View>
                  <Body>Дата завершения</Body>
                  <Body>{moment(dateEnd).format('LL')}</Body>
                </View>

                <Button text="Изменть" onPress={() => setOpenDate(true)} />
              </View>
              <DatePicker
                modal
                mode="date"
                open={openDate}
                date={dateStart}
                onConfirm={date => {
                  setOpenDate(false);
                  setDateStart(date);
                }}
                onCancel={() => {
                  setOpenDate(false);
                }}
              />
              <DatePicker
                modal
                mode="date"
                open={openDateEnd}
                date={dateEnd}
                onConfirm={date => {
                  setOpenDateEnd(false);
                  setDateEnd(date);
                }}
                onCancel={() => {
                  setOpenDateEnd(false);
                }}
              />
              <Button
                text="Добвить"
                bottom
                onPress={handleSubmit}
                containerStyle={styles.formBtn}
              />
            </>
          )}
        </Formik>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
  },
  dateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  formPadding: {
    paddingVertical: 20,
  },
  formBtn: {
    paddingBottom: 20,
  },
});
