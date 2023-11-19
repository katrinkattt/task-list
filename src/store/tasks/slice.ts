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
      const selectedTaskId = payload.id;
      state.tasks.find(task => {
        if (task?.id === selectedTaskId) {
          task.completly = !task.completly;
        }
      });
    },
    editTask: (state, {payload}: PayloadAction<ITask>) => {
      const selectedTaskId = payload.id;
      state.tasks.find(task => {
        if (task?.id === selectedTaskId) {
          task.title = payload.title;
          task.description = payload.description;
          task.dateStart = payload.dateStart;
          task.dateEnd = payload.dateEnd;
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
      const trashId = payload.id;
      state.trash = state.trash.filter(tasks => tasks.id !== trashId);
      return state;
      // return {
      //   ...state,
      //   trash: state.trash.filter(task => task.id === taskId),
      // };
      // not stability
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

export const {
  addTask,
  setReadyTask,
  editTask,
  delTask,
  clearTrash,
  delTaskInTrash,
} = taskSlise.actions;
export const taskReducer = persistReducer(persistConfig, taskSlise.reducer);
