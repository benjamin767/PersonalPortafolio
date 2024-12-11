import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import { PrimeReactProvider } from 'primereact/api';
import "primereact/resources/themes/lara-light-cyan/theme.css"
import 'primeicons/primeicons.css';
import "/node_modules/primeflex/primeflex.css";

const root = ReactDOM.createRoot(document.getElementById('root'));
const value = {
  appendTo: 'self',
  ripple: true,
};

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <PrimeReactProvider value={value}>
          <App />
        </PrimeReactProvider>
      </Router>
    </Provider>
  </React.StrictMode>
);

