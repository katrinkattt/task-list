import React, {memo, useState} from 'react';
import {
  View,
  StyleSheet,
  ViewStyle,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import moment from 'moment-with-locales-es6';
import Body from '../components/Body';
import {colors} from '../theme/colorTheme';
import {ITask} from '../store/tasks/types';
import Button from './Button';

interface ITaskItem {
  task: ITask;
  style?: ViewStyle;
  inTrash?: boolean;
  comfirmReadyTask?: Function;
  taskDelete?: Function;
  goToEditTask?: Function;
}

const TaskItem = ({
  task,
  style,
  inTrash = false,
  comfirmReadyTask = () => {},
  taskDelete = () => {},
  goToEditTask = () => {},
}: ITaskItem) => {
  moment.locale('ru');
  const [showItem, setShowItem] = useState<boolean>(false);
  const isDarkMode = useColorScheme() === 'dark';
  const defaultBacground = isDarkMode ? colors.black : colors.ligthBorder;

  return (
    <TouchableOpacity onPress={() => setShowItem(!showItem)}>
      <View
        style={[styles.taskItem, style, {backgroundColor: defaultBacground}]}>
        <View style={styles.taskRow}>
          <View>
            <Body size={26} bold>
              {task.title}
            </Body>
            <Body size={16}>
              {task?.completly ? 'Выполнена' : 'В процессе'}
            </Body>
          </View>
          <Body
            size={36}
            color={task?.completly ? colors.green : colors.accent}>
            {task?.completly ? '☑' : '⧖'}
          </Body>
        </View>
        <Body size={18} numberOfLines={showItem ? 20 : 2}>
          {task?.description}
        </Body>
        {showItem && (
          <View style={styles.paddingT}>
            <Body size={18}>
              {'Дата начала ' + moment(task.dateStart).format('LL')}
            </Body>
            <Body size={18}>
              {'Дата конца ' + moment(task.dateEnd).format('LL')}
            </Body>
            {!inTrash ? (
              <View style={styles.paddingT}>
                {!task?.completly && (
                  <Button
                    onPress={() => goToEditTask(task)}
                    text="Редактировать"
                    bColor={colors.green}
                  />
                )}
                <View style={styles.taskRow}>
                  <Button
                    onPress={() => taskDelete(task)}
                    text="Удалить"
                    containerStyle={styles.buttonWidth}
                  />
                  <Button
                    text={task?.completly ? 'Выполнена ☑' : 'Выполнена'}
                    onPress={() => comfirmReadyTask(task)}
                    bColor={colors.green}
                    containerStyle={styles.buttonWidth}
                  />
                </View>
              </View>
            ) : (
              <View style={styles.paddingT}>
                <Button
                  onPress={() => taskDelete(task)}
                  text="Удалить безвозвратно"
                />
              </View>
            )}
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};
export default memo(TaskItem);

const styles = StyleSheet.create({
  taskItem: {
    padding: 10,
    borderRadius: 10,
    marginVertical: 8,
  },
  taskRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  paddingT: {paddingTop: 20},
  buttonWidth: {width: 180},
});
