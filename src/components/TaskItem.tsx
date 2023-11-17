import React, {memo} from 'react';
import {View, StyleSheet, ViewStyle} from 'react-native';
import Body from '../components/Body';
import {colors} from '../theme/colorTheme';
import {ITask} from '../store/tasks/types';

interface ITaskItem {
  task: ITask;
  style?: ViewStyle;
}

const TaskItem = ({task, style}: ITaskItem) => {
  return (
    <View style={[styles.taskItem, style]}>
      <View>
        <Body size={26}>{task.title}</Body>
        <Body size={16}>{task?.completly ? 'Выполнена' : 'В процессе'}</Body>
      </View>

      <Body size={18}>{task?.description}</Body>
    </View>
  );
};
export default memo(TaskItem);

const styles = StyleSheet.create({
  taskItem: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: colors.ligthBorder,
  },
});
