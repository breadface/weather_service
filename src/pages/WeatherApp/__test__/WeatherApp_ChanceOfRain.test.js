import React from 'react';
import renderer from 'react-test-renderer'
import store from  '../../../store'
import WeatherApp_ChanceOfRain from '../WeatherApp_ChanceOfRain';

test('Renders snapshot for Weather AmountOfRain page', () => {
  const tree = renderer.create(
    <WeatherApp_ChanceOfRain />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
