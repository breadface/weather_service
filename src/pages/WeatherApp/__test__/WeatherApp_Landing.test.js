import React from 'react';
import renderer from 'react-test-renderer'
import store from  '../../../store'
import WeatherApp_Landing from '../WeatherApp_Landing';

global.fetch = jest.fn()

test('Renders snapshot for Weather Landing page', () => {
  const state = () => ({data: [], chance_of_rain: []});

  const tree = renderer.create(
    <WeatherApp_Landing
      store={store}
    />
  ).toJSON();
  expect(tree).toMatchSnapshot();
})
