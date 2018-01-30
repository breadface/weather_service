import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import './index.css';
import store from './store'
import WeatherApp_Landing from './pages/WeatherApp/WeatherApp_Landing'

ReactDOM.render(
  <Provider store={store}>
    <WeatherApp_Landing />
  </Provider>
  ,
  document.getElementById('root')
);
