import React from 'react';
import MainNavigationStack from './src/navigation/mainNavigationStack';
import {Provider} from 'react-redux';
import store from './src/redux/store';

function App() {
  return (
    <Provider store={store}>
      <MainNavigationStack />
    </Provider>
  );
}

export default App;
