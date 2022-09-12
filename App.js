import React from 'react';
import 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';
import {SignedInStack, HomeStack} from './src/navigator/stacknavigator';

import {NavigationContainer} from '@react-navigation/native';
const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <SignedInStack />
      </NavigationContainer>
    </Provider>
  );
};
export default App;
