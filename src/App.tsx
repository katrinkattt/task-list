import React from 'react';
import {SafeAreaView, useColorScheme, View, StyleSheet} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Provider} from 'react-redux';
import {persistor, store} from './store';
import {PersistGate} from 'redux-persist/integration/react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Navigator} from './navigation';
import AppLogic from './AppLogic';

const App = (): JSX.Element => {
  if (__DEV__) {
    import('./reactotron').then(() => console.log('Reactotron Configured'));
  }
  const isDarkMode = useColorScheme() === 'dark';
  console.log(useColorScheme(), 'useColorScheme()dfvd');
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={backgroundStyle} />
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppLogic>
            <SafeAreaProvider>
              <Navigator />
            </SafeAreaProvider>
          </AppLogic>
        </PersistGate>
      </Provider>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
