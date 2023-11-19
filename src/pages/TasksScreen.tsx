/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {View, StyleSheet, FlatList, Alert, useColorScheme} from 'react-native';
import TaskItem from '../components/TaskItem';
import Button from '../components/Button';
import {useNavigation} from '@react-navigation/native';
import {RoutesNames} from '../navigation/RoutesNames';
import {useDispatch, useSelector} from 'react-redux';
import {TouchableOpacity} from 'react-native-gesture-handler';
import DropDownPicker from 'react-native-dropdown-picker';
import {getTasks} from '../store/tasks/selectors';
import Body from '../components/Body';
import {delTask, setReadyTask} from '../store/tasks/slice';
import {ITask} from '../store/tasks/types';
import {colors, useAccentTheme} from '../theme/colorTheme';

interface IFilter {
  notSortTasks: ITask[];
  nameField: 'dateStart' | 'dateEnd' | 'title' | 'id' | 'default';
}

export const TasksScreen = (): JSX.Element => {
  const navigation = useNavigation();
  const isDarkMode = useColorScheme() === 'dark';

  const {tasks} = useSelector(getTasks);
  const [page, setPage] = useState<number>(1);
  const [tasksArray, setTasksArray] = useState<ITask[]>([]);
  const [sortedTasksFull, setSortedTaskFull] = useState<ITask[]>([...tasks]);
  const [isSort, setIsSort] = useState<boolean>(false);
  const [DropDownOpen, setDropDownOpen] = useState<boolean>(false);
  const [filter, setFilter] = useState<IFilter['nameField']>('default');
  const [showOnlyActiveTask, setShowOnlyActiveTask] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const additionalHeaderBgColor = useAccentTheme();

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [tasks]);

  const ActiveTaskShow = (active: boolean) => {
    setFilter('default');
    setShowOnlyActiveTask(active);
    !active
      ? setTasksArray([...tasks])
      : setTasksArray(
          [...tasks].filter((obj: ITask) => obj.completly === false),
        );
  };

  const sortTasksByField = (
    notSortTasks: ITask[],
    nameField: IFilter['nameField'],
  ) => {
    if (nameField === 'default') {
      setPage(1);
      setIsSort(false);
      fetchTasks();
      return;
    } else if (nameField === 'title' || nameField === 'id') {
      setSortedTaskFull(
        [...notSortTasks].sort((a, b) => {
          if (a.title && b.title) {
            return a.title.localeCompare(b.title);
          }
          return 0;
        }),
      );
    } else {
      setSortedTaskFull(
        [...notSortTasks].sort((a, b) => {
          const dateA = a[nameField]
            ? new Date(a[nameField] as string)
            : undefined;
          const dateB = b[nameField]
            ? new Date(b[nameField] as string)
            : undefined;

          if (dateA && dateB) {
            return dateA.getTime() - dateB.getTime();
          } else if (dateA) {
            return -1;
          } else if (dateB) {
            return 1;
          }

          return 0;
        }),
      );
    }

    setPage(1);
    setIsSort(true);
    fetchTasks();
  };

  const fetchTasks = async () => {
    const loadContentCount: number = page * 15;
    try {
      setLoading(true);
      setTimeout(() => {
        //типо обращение к серверу +await
        isSort
          ? setTasksArray(sortedTasksFull.slice(0, loadContentCount))
          : setTasksArray(tasks.slice(0, loadContentCount));
        setLoading(false);
      }, 500);
    } catch {
      setLoading(false);
    }
  };

  const onRefresh = () => {
    setIsSort(false);
    setPage(1);
    setRefreshing(true);
    fetchTasks();
    setRefreshing(false);
    setShowOnlyActiveTask(false);
  };

  const onEndReached = () => {
    console.log('on END');

    if (!loading) {
      console.log('NEXT LOAD');

      setPage(page + 1);
      fetchTasks();
    }
  };
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
  const goToEditTask = (task: ITask) => {
    //@ts-ignore
    navigation.navigate(RoutesNames.EDIT, {data: task});
  };

  return (
    <>
      <View
        style={[
          styles.additionalHeader,
          {backgroundColor: additionalHeaderBgColor},
        ]}>
        <Body color={colors.accent}>Сортировка</Body>
        <TouchableOpacity
          onPress={() => {
            ActiveTaskShow(!showOnlyActiveTask);
          }}>
          <Body color={colors.accent}>
            {showOnlyActiveTask ? 'Активные' : 'Все'}
          </Body>
        </TouchableOpacity>
      </View>
      <DropDownPicker
        onSelectItem={async fieldName => {
          const field = fieldName?.value ? fieldName.value : 'default';
          sortTasksByField(tasks, field);
        }}
        closeAfterSelecting={true}
        theme={isDarkMode ? 'DARK' : 'LIGHT'}
        open={DropDownOpen}
        value={filter}
        items={[
          {label: 'По умолчанию', value: 'default'},
          {label: 'По дате начала', value: 'dateStart'},
          {label: 'По дате истечения', value: 'dateEnd'},
          {label: 'По названию', value: 'title'},
          {label: 'По id', value: 'id'},
        ]}
        setOpen={setDropDownOpen}
        setValue={setFilter}
      />
      <View style={styles.container}>
        {tasks?.length >= 1 ? (
          <>
            <FlatList
              data={tasksArray}
              keyExtractor={(item: ITask) => item.id.toString()}
              onRefresh={onRefresh}
              refreshing={refreshing}
              onEndReached={onEndReached}
              onEndReachedThreshold={0.1}
              ListFooterComponent={() => (
                <View style={styles.centerTitle}>
                  <Body bold>
                    {loading || tasksArray.length !== tasks.length
                      ? '...'
                      : 'Конец списка'}
                  </Body>
                </View>
              )}
              style={{marginBottom: 35, paddingTop: 16}}
              renderItem={({item}) => (
                <TaskItem
                  comfirmReadyTask={comfirmReadyTask}
                  taskDelete={taskDelete}
                  goToEditTask={goToEditTask}
                  task={item}
                />
              )}
            />
          </>
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
  },
  additionalHeader: {
    height: 40,
    paddingHorizontal: 15,
    margin: 0,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  centerTitle: {
    paddingVertical: 20,
    height: 120,
    alignItems: 'center',
  },
});
