import React from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import createAppStore from './src/app/reducers';
import rootSaga from './src/app/sagas';
import AppNavigationNi from './src/navigations';

const { store, persistor, runSaga } = createAppStore();
runSaga(rootSaga);

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <View style={{ flex: 1 }}>
          <AppNavigationNi />
        </View>
      </PersistGate>
    </Provider>
  );
};

export default App;