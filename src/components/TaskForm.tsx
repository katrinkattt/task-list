import React, {memo, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import moment from 'moment';
import {Formik, FormikHelpers} from 'formik';
import Body from '../components/Body';
import {ITask} from '../store/tasks/types';
import FormikInput from '../components/FormikInput';
import Button from '../components/Button';
import DatePicker from 'react-native-date-picker';
import {validator, required} from '../utils/validator';

interface ITaskForm {
  initialValues?: ITask;
  submitTask: ((
    values: ITask,
    formikHelpers: FormikHelpers<ITask>,
  ) => void | Promise<any>) &
    Promise<any>;
  isEdit?: boolean;
  onChangeDateStart: Function;
  onChangeDateEnd: Function;
}
const TaskForm = ({
  initialValues = {
    id: 0,
    title: '',
  },
  submitTask,
  isEdit = false,
  onChangeDateStart = () => {},
  onChangeDateEnd = () => {},
}: ITaskForm) => {
  moment.locale('ru');
  const [dateStart, setDateStart] = useState<Date>(
    isEdit ? new Date(initialValues?.dateStart) : new Date(),
  );
  const [dateEnd, setDateEnd] = useState<Date>(
    isEdit ? new Date(initialValues?.dateEnd) : new Date(),
  );
  const [openDate, setOpenDate] = useState<boolean>(false);
  const [openDateEnd, setOpenDateEnd] = useState<boolean>(false);
  console.log('initialValues', initialValues);

  return (
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
              <Body bold>Дата начала</Body>
              <Body>{moment(dateStart).format('LL')}</Body>
            </View>

            <Button text="Изменть" onPress={() => setOpenDate(true)} />
          </View>
          <View style={styles.dateRow}>
            <View>
              <Body bold>Дата завершения</Body>
              <Body>{moment(dateEnd).format('LL')}</Body>
            </View>

            <Button text="Изменть" onPress={() => setOpenDateEnd(true)} />
          </View>
          <DatePicker
            modal
            mode="date"
            open={openDate}
            date={dateStart}
            onConfirm={date => {
              setOpenDate(false);
              setDateStart(date);
              onChangeDateStart(date);
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
              onChangeDateEnd(date);
            }}
            onCancel={() => {
              setOpenDateEnd(false);
            }}
          />
          <Button
            text={isEdit ? 'Сохранить изменения' : 'Добвить'}
            bottom
            onPress={handleSubmit}
            containerStyle={styles.formBtn}
          />
        </>
      )}
    </Formik>
  );
};
export default memo(TaskForm);

const styles = StyleSheet.create({
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
