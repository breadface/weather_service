// @flow

export type Action = {
  type: string,
  payload: Object
}

export type Data = {
  day: number,
  amount: number
};

export type Chance = {
  day: number,
  chance: Array<number>
};

export type State = {
  data: Array<Data>,
  chance_of_rain: Array<Chance>
}

export type WeatherProps = State & {
  getRainFallData: () => mixed,
  setChanceOfRain: (Array<Chance>) => mixed
}

export type WeatherState = {
  temperature: number,
  pressure: number
}
