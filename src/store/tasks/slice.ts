import AsyncStorage from '@react-native-community/async-storage';
import {
  PayloadAction,
  createSlice,
  //PayloadActions
} from '@reduxjs/toolkit';
import {PersistConfig, persistReducer} from 'redux-persist';
import {ITask, ITaskState} from './types';

export const initialStateTask: ITaskState = {
  tasks: [],
  newTask: {
    id: 0,
    title: '',
    description: '',
    dateStart: '',
    dateEnd: '',
    completly: false,
  },
  trash: [],
};

const taskSlise = createSlice({
  name: 'task',
  initialState: initialStateTask,
  reducers: {
    addTask: (state, action) => {
      console.log('addTask action.payload', action.payload);
      state.tasks.unshift(action.payload);
    },
    setReadyTask: (state, {payload}: PayloadAction<ITask>) => {
      const selectedTodoId = payload.id;
      state.tasks.find(todo => {
        if (todo?.id === selectedTodoId) {
          todo.completly = !todo.completly;
        }
      });
    },
    delTask: (state, {payload}: PayloadAction<ITask>) => {
      const taskId = payload.id;
      state.trash.unshift(payload);
      state.tasks = state.tasks.filter(tasks => tasks.id !== taskId);
      return state;
    },
    delTaskInTrash: (state, {payload}: PayloadAction<ITask>) => {
      const taskId = payload.id;
      return {
        ...state,
        trash: state.trash.filter(task => task.id === taskId),
      };
    },
    clearTrash: state => {
      return {...state, trash: []};
    },
  },
});

const persistConfig: PersistConfig<ITaskState> = {
  key: 'task',
  storage: AsyncStorage,
  whitelist: [],
};

export const {addTask, setReadyTask, delTask, clearTrash, delTaskInTrash} =
  taskSlise.actions;
export const taskReducer = persistReducer(persistConfig, taskSlise.reducer);
