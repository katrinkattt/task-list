/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, StyleSheet, FlatList, Alert} from 'react-native';
import TaskItem from '../components/TaskItem';
import Button from '../components/Button';
import {useDispatch, useSelector} from 'react-redux';
import {getTasks} from '../store/tasks/selectors';
import Body from '../components/Body';
import {clearTrash, delTaskInTrash} from '../store/tasks/slice';
import {ITask} from '../store/tasks/types';

export const TrashScreen = () => {
  const {trash} = useSelector(getTasks);
  const dispatch = useDispatch();

  const trashClearAll = () => {
    Alert.alert('Вы действительно хотите очистить корзину?', '', [
      {
        text: 'Да',
        onPress: () => dispatch(clearTrash()),
        style: 'cancel',
      },
      {
        text: 'Отменить',
        style: 'cancel',
      },
    ]);
  };

  const delCurrentTrash = (delteTask: ITask) => {
    dispatch(delTaskInTrash(delteTask));
  };

  return (
    <>
      <View style={styles.container}>
        {trash?.length >= 1 ? (
          <>
            <FlatList
              data={trash}
              keyExtractor={(item: ITask) => item.id.toString()}
              maxToRenderPerBatch={5}
              style={{marginBottom: 35, marginTop: 16}}
              renderItem={({item}) => (
                <TaskItem taskDelete={delCurrentTrash} task={item} inTrash />
              )}
            />
            <Button onPress={trashClearAll} text="Очистить корзину" bottom />
          </>
        ) : (
          <View style={styles.centerTitle}>
            <Body bold size={20}>
              Корзина пуста
            </Body>
          </View>
        )}
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
