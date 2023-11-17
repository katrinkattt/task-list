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

const Tab = createBottomTabNavigator();

const AcentColor = colors.accent;

const TabStack = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color}) => {
          if (route.name === RoutesNames.TASKS) {
            return <IconHomeTask color={color} />;
          } else {
            return <IconTrash color={color} />;
          }
        },
        tabBarActiveTintColor: AcentColor,
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen name={RoutesNames.TASKS} component={TasksScreen} />
      <Tab.Screen name={RoutesNames.TRASH} component={TrashScreen} />
    </Tab.Navigator>
  );
};
const Stack = createStackNavigator();

export const Navigator = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: isDarkMode ? colors.black : colors.white,
    },
  };

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : colors.accent,
  };
  return (
    <>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <NavigationContainer theme={theme}>
        <Stack.Navigator>
          <Stack.Screen
            options={{headerShown: false}}
            name={RoutesNames.TASKS}
            component={TabStack}
          />
          <Stack.Screen
            name={RoutesNames.ADD_TASK}
            component={EditorTaskScreen}
          />
          <Stack.Screen name={RoutesNames.EDIT} component={EditorTaskScreen} />
          {/* <Stack.Screen name="EditorTaskScreen" component={EditorTaskScreen} />
        <Stack.Screen name="TrashScreen" component={TrashScreen} /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};
