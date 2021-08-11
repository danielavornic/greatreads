import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor } from './redux/store';

import { ChakraProvider, extendTheme } from '@chakra-ui/react';

const colors = {
  brand: {
    25: '#f5f6ff',
    50: '#ecefff',
    100: '#cbceeb',
    200: '#a9aed6',
    300: '#888ec5',
    400: '#666db3',
    500: '#4d5499',
    600: '#3c4178',
    700: '#2a2f57',
    800: '#181c37',
    900: '#080819'
  }
};

const config = {
  initialColorMode: 'light',
  useSystemColorMode: false
};

const theme = extendTheme({ colors, config });

const rootElement = document.getElementById('root');

ReactDOM.render(
  <Provider store={store}>
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <PersistGate persistor={persistor}>
          <App />
        </PersistGate>
      </BrowserRouter>
    </ChakraProvider>
  </Provider>,
  rootElement
);

reportWebVitals();