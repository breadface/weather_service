const URL = "http://private-4945e-weather34.apiary-proxy.com/weather34/rain";

const getRainFallData = () => async (dispatch) => {
  try {
    let result = await fetch(URL);
    let data = await result.json();
    if (data) {
      //dispatches action here
      dispatch({payload: data[0].days, type: 'GET_WEATHER_DETAILS'})
    }
  } catch (error) {
    // console.log("Something went wrong", error);
  }
}

const setChanceOfRain = data => dispatch => {
  dispatch({payload: data, type: 'SET_CHANCE_OF_RAIN'})
}

export default {getRainFallData, setChanceOfRain};
