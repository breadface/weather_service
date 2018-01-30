import React from 'react';
import renderer from 'react-test-renderer'
import store from  '../../../store'
import Slider from '../Slider';

test('Renders snapshot for Weather Slider page', () => {
  const tree = renderer.create(
    <Slider />
  ).toJSON();
  expect(tree).toMatchSnapshot();
})
