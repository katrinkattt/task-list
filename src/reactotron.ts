import AsyncStorage from '@react-native-community/async-storage';
import {NativeModules} from 'react-native';
import Reactotron from 'reactotron-react-native';
import {reactotronRedux} from 'reactotron-redux';

let config = {
  name: 'example',
};

if (__DEV__) {
  const scriptURL = NativeModules.SourceCode.scriptURL;
  // @ts-ignore
  config.host = scriptURL.split('://')[1].split(':')[0];
}

// @ts-ignore
console.log = Reactotron.log;
// @ts-ignore
console.warn = Reactotron.logImportant;
// @ts-ignore
console.error = Reactotron.logImportant;

// @ts-ignore
const reactotron = Reactotron.configure(config)
  .useReactNative()
  .setAsyncStorageHandler(AsyncStorage)
  .use(reactotronRedux())
  .connect();

export default reactotron;
