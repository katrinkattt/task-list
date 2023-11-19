import {useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

export const colors = {
  accent: '#fa1252',
  red: '#EB5757',
  white: '#fff',
  ligther: '#f0f0f0',
  ligthBorder: 'rgba(232, 232, 240, 1)',
  black: '#000',
  darkBlue: '#243757',
  blue: '#2F80ED',
  green: '#00af2a',
  gray: '#999',
};

export const useAccentTheme = (): string => {
  const isDarkMode = useColorScheme() === 'dark';
  const theme = isDarkMode ? Colors.black : Colors.white;
  return theme;
};
export const useMainTheme = (): string => {
  const isDarkMode = useColorScheme() === 'dark';
  const theme = isDarkMode ? Colors.darker : Colors.lighter;
  return theme;
};
