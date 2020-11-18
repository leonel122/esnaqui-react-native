/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import {Navigation} from 'react-native-navigation';
import {registerScreens} from './src/navigator/registerScreens';
import {setDefaultOptions} from './src/navigator/setDefaultOptions';
import setRoot from './src/navigator/setRoot';

export function start() {
  registerScreens();
  setDefaultOptions();
  Navigation.events().registerAppLaunchedListener(async () => {
    // noinspection ES6MissingAwait
    Navigation.dismissAllModals();
    setRoot();
  });
}
