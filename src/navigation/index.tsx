import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {TasksScreen} from '../pages/TasksScreen';
import {TrashScreen} from '../pages/TrashScreen';
import {EditorTaskScreen} from '../pages/EditorTaskScreen';
import {RoutesNames} from './RoutesNames';
import IconHomeTask from '../components/icons/IconHomeTask';
import IconTrash from '../components/icons/IconTrash';
import {colors} from '../theme/colorTheme';
import {useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {NewTaskScreen} from '../pages/NewTaskScreen';
import {useAccentTheme} from '../theme/colorTheme';

const Tab = createBottomTabNavigator();

const AcentColor = colors.accent;

const TabStack = () => {
  const tabBgColor = useAccentTheme();
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({color}) => {
          if (route.name === RoutesNames.TASKS) {
            return <IconHomeTask color={color} />;
          } else {
            return <IconTrash color={color} />;
          }
        },
        tabBarStyle: {
          height: 80,
          backgroundColor: tabBgColor,
        },
        tabBarActiveTintColor: AcentColor,
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen
        name={RoutesNames.TASKS}
        component={TasksScreen}
        options={{
          headerStyle: {backgroundColor: tabBgColor},
          headerTintColor: AcentColor,
        }}
      />
      <Tab.Screen
        name={RoutesNames.TRASH}
        component={TrashScreen}
        options={{
          headerStyle: {backgroundColor: tabBgColor},
          headerTintColor: AcentColor,
        }}
      />
    </Tab.Navigator>
  );
};
const Stack = createStackNavigator();

export const Navigator = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const tabBgColor = useAccentTheme();
  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: isDarkMode ? Colors.darker : colors.ligther,
    },
  };

  return (
    <>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <NavigationContainer theme={theme}>
        <Stack.Navigator>
          <Stack.Screen
            options={{headerShown: false}}
            name={RoutesNames.HOME}
            component={TabStack}
          />
          <Stack.Screen
            name={RoutesNames.EDIT}
            component={EditorTaskScreen}
            options={{
              headerStyle: {backgroundColor: tabBgColor},
              headerTintColor: AcentColor,
            }}
          />
          <Stack.Screen
            name={RoutesNames.ADD_TASK}
            component={NewTaskScreen}
            options={{
              headerStyle: {backgroundColor: tabBgColor},
              headerTintColor: AcentColor,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};
