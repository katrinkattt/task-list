import AsyncStorage from '@react-native-community/async-storage';
import {
  createSlice,
  //PayloadActions
} from '@reduxjs/toolkit';
import {PersistConfig, persistReducer} from 'redux-persist';
import {ITaskState} from './types';

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
      state.tasks.push(action.payload);
    },
  },
});

const persistConfig: PersistConfig<ITaskState> = {
  key: 'task',
  storage: AsyncStorage,
  whitelist: [],
};

export const taskReducer = persistReducer(persistConfig, taskSlise.reducer);
