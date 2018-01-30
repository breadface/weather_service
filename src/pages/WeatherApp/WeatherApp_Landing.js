//@flow
import  React from 'react';
import {connect} from 'react-redux';
import Actions from '../../actions';
import Slider from   '../../components/common/Slider';
import WeatherApp_AmountOfRain from './WeatherApp_AmountOfRain';
import WeatherApp_ChanceOfRain from './WeatherApp_ChanceOfRain';
import type {WeatherState, WeatherProps} from '../../constants/types';

let margin = {top: 20, right: 20, bottom: 70, left: 40};
let width = 600 - margin.left - margin.right;
let height = 300 - margin.top - margin.bottom;

class WeatherApp_Landing extends React.Component<WeatherProps, WeatherState> {
  state: WeatherState
  props: WeatherProps

  state = {
    temperature: 15,
    pressure: 1010
  }

  componentDidMount(){
    this.props.getRainFallData()
  }

  componentDidUpdate(prevProps:WeatherProps, prevState:WeatherState) {
    let {temperature, pressure} = this.state
    if ((prevProps.data !== this.props.data) || (prevState.temperature !== temperature) || (prevState.pressure !== pressure)) {
      let chance_of_rain = this.props.data
      .map(data => ({
        day: data.day,
        chance: this.chanceOfRain(pressure, temperature, data.amount)
      }))
      this.props.setChanceOfRain(chance_of_rain)
    }
  }

  chanceOfRain(pressure, temperature, amount) {
    const score = Math.log(amount + 1) * Math.log(pressure - 929) * Math.log(temperature - 9);
    const mean = Math.min(Math.max(score, 0), 100)
    const upper_bound = Math.min(1.5 * mean, 100);
    const lower_bound = Math.max(0.5 * mean, 0);
    return [lower_bound, mean, upper_bound];
  }

  render(){
    const handleChange = key => value => {
      this.setState({[key]: value})
    }

    const { data, chance_of_rain } = this.props
    const {temperature, pressure } = this.state
    return (
      <div>
        <nav>
          <h2>Weather Service Dashboard</h2>
        </nav>
        <div className="grid-box">
          <div className="grid-header">
            <h4>Chance of Rain</h4>
          </div>
          <div className="grid">
            <div className="grid-cell">
              <div className="grid">
                <Slider
                  title="TEMPERATURE (&#8451;)"
                  value={temperature}
                  min={10}
                  max={35}
                  onChange={handleChange("temperature")}
                />
                <Slider
                  title="PRESSURE (hPa)"
                  value={pressure}
                  min={970}
                  max={1030}
                  onChange={handleChange("pressure")}
                />
              </div>
            </div>
            <WeatherApp_ChanceOfRain
              margin={margin}
              width={width}
              height={height}
              data={chance_of_rain}
             />
          </div>
        </div>
        <div className="grid-box">
          <div className="grid-header">
            <h4>Amount of Rainfall</h4>
          </div>
          <div className="grid center">
            <WeatherApp_AmountOfRain
              margin={margin}
              width={width}
              height={height}
              data={data}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  ({data, chance_of_rain}, props) => ({data, chance_of_rain}),
  (dispatch, props) => ({
    getRainFallData(){
      dispatch(Actions.getRainFallData())
    },
    setChanceOfRain(data){
      dispatch(Actions.setChanceOfRain(data))
  }})
)(WeatherApp_Landing);
