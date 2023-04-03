import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import WorkspacesProvider from './context/WorkspacesContext';
import PageProvider from './context/PageContext';
import configureStore from './store';
import * as sessionActions from './store/session';
import "./index.css";

const store = configureStore()

if (process.env.NODE_ENV !== 'production') {
  window.store = store;
  window.sessionActions = sessionActions;
}



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <PageProvider>
      <WorkspacesProvider>
        <BrowserRouter>
          <App />
          
        </BrowserRouter>
      </WorkspacesProvider>
      </PageProvider>
    </ReduxProvider>
  </React.StrictMode>
);
