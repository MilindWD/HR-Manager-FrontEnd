//Basic react imports
import React from 'react';
import ReactDOM from 'react-dom';
//Main CSS file
import './index.css';
import reportWebVitals from './reportWebVitals';
//Main React router app
import App from './app';
//bootstrap
import './bootstrap.min.css';
//Redux Store
import store from './store';
import {Provider} from 'react-redux';


//React render single page app
ReactDOM.render(
  <Provider store={store}>
    <App />
    
  </Provider>,
  //rendering
  document.getElementById('app')
);

//don't know
reportWebVitals();
