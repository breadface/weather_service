import React from 'react';
import renderer from 'react-test-renderer'
import store from  '../../../store'
import WeatherApp_AmountOfRain from '../WeatherApp_AmountOfRain';

test('Renders snapshot for Weather AmountOfRain page', () => {
  const tree = renderer.create(
    <WeatherApp_AmountOfRain />
  ).toJSON();
  expect(tree).toMatchSnapshot();
})
