// @flow
import type {Action, State} from '../constants/types';

const weather_state = {
  data: [],
  chance_of_rain: []
}

const weatherReducer = (state:State=weather_state, action:Action) => {
  switch (action.type) {
    case 'GET_WEATHER_DETAILS':
      return {...state, data: action.payload};
    case 'SET_CHANCE_OF_RAIN':
      return {...state, chance_of_rain: action.payload};
    default:
      return state;
  }
}

export default weatherReducer;
