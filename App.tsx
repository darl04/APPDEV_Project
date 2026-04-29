import React from 'react';
import { ActivityIndicator, StatusBar, View } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import AppNavigationNi from './src/navigations';
import rootSaga from './src/app/sagas';
import configureStore from './src/app/reducers';

const { store, persistor, runSaga } = configureStore();

runSaga(rootSaga);

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate
        loading={
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" />
          </View>
        }
        persistor={persistor}
      >
        <View style={{ flex: 1 }}>
          <StatusBar barStyle="dark-content" />
          <AppNavigationNi />
        </View>
      </PersistGate>
    </Provider>
  );
};

export default App;
