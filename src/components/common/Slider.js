//@flow
import React from 'react';

type SliderType = {
  min: number,
  max: number,
  value: number,
  title: string,
  onChange: (value: number) => mixed
}

const Slider = ({onChange, min, max, value, title}: SliderType) =>  (
  <div className="grid-cell center slider-container">
    <div className="slider">
      <div className="title">{title}</div>
      <div>
        <input
          type="range"
          value={value}
          min={min} max={max}
          onChange={e => {
            onChange(e.target.value);
          }}
        />
      </div>
      <div className="slider-value">
        <div>{value}</div>
      </div>
    </div>
  </div>
);

export default Slider
