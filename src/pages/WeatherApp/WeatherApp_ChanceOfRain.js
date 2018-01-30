import React from 'react';
import * as d3 from 'd3';
import type {Chance} from '../../constants/types';

type ChanceOfRainType = {
  data: Array<Chance>,
  margin: {top: number, right: number, bottom: number, left: number},
  height: number,
  width: number
}

const WeatherApp_ChanceOfRain = ({data, margin, height, width}: ChanceOfRainType) => {
  const renderChart = ref => {
    ref.innerHTML = "";

    // set the ranges
    let x = d3.scaleLinear()
    .domain([0, data.length -1])
    .range([0, width]);

    let y = d3.scaleLinear()
      .domain([0, 100])
      .range([height, 0]);

    let getValueLine = index => d3.area()
        .x((d) => x(d.day))
        .y((d) => y(d.chance[index]))
        // .curve(d3.curveBasis);

    let getArea = index => d3.area()
        .x((d) => x(d.day))
        .y0((d) => y(d.chance[index]))
        .y1((d) => y(d.chance[index+1]))
        // .curve(d3.curveBasis);

    let addPath = (type, color) => svg.append("path")
            .data([data])
            .attr("class", color)
            .attr("d", type);

            // Add the scatterplot
    let addPloth = (index, color) => svg.selectAll("dot")
            .data(data)
            .enter().append("circle")
            .attr("r", 3)
            .attr("cx", (d) => x(d.day))
            .attr("cy", (d) => y(d.chance[index]))
            .style("fill", color)


    // define the line
    let lower_bound_line = getValueLine(0);
    let mean_value_line = getValueLine(1);
    let upper_bound_line = getValueLine(2);


    //define area
    let area1 = getArea(0);
    let area2 = getArea(1);

    let xAxis = d3.axisBottom(x)
        .tickSize(-height);
    let yAxis = d3.axisLeft(y)
      .tickSize(-width);

    let svg = d3.select(ref)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

        x.domain(d3.extent(data, (d) => d.day));
        // y.domain([0, d3.max(data, (d) => d.chance[0])]);


    // Add the area paths
    addPath(area1, 'area-blue');
    addPath(area2, 'area-green');

    // Add the valueline paths
    addPath(lower_bound_line, 'line-blue');
    addPath(mean_value_line, 'line-red');
    addPath(upper_bound_line, 'line-green');


    // Add the scatterplot
    addPloth(0, 'steelblue');
    addPloth(1, 'red');
    addPloth(2, 'green');

    // Add the X Axis
    svg.append("g")
         .attr("transform", `translate(0, ${height})`)
         .call(xAxis);


     // text label for the x axis
    svg.append("text")
        .attr("transform", `translate(${(width/2)}, ${(height + margin.top + 20)})`)
        .style("text-anchor", "middle")
        .text("Day");

    svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left)
    .attr("x",0 - (height / 2))
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("Probability %");

     // Add the Y Axis
    svg.append("g")
         .call(yAxis);
  }

  return (
      <div
      className="grid-cell"
      ref={ref => ref !==  null && renderChart(ref)}
    />
  );
};

export default WeatherApp_ChanceOfRain;
