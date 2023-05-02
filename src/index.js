import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App/App';
import { BrowserRouter } from 'react-router-dom';
import store from "./storageToolKit/store";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // Добавление провайдера, указывающего на хранилище Redux, + Роутера вокруг приложения
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>

);
