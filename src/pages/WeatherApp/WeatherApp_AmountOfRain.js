// @flow
import React from 'react';
import * as d3 from 'd3';
import type {Data} from '../../constants/types';

type AmountOfRainType = {
  data: Array<Data>,
  margin: {top: number, right: number, bottom: number, left: number},
  height: number,
  width: number
}

const WeatherApp_AmountOfRain = ({data, margin, height, width}: AmountOfRainType) => {
  const renderChart = ref => {
    ref.innerHTML = "";

    let x = d3.scaleBand()
    .rangeRound([0, width])
    .paddingInner(0.05);

    let y = d3.scaleLinear()
    .domain([0, d3.max(data)])
    .range([height, 0]);

    let xAxis = d3.axisBottom(x);
    let yAxis = d3.axisLeft(y);

    let svg = d3.select(ref)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    x.domain(data.map((d) => d.day));
    y.domain([0, d3.max(data, (d) => d.amount)]);

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", `translate(0, ${height})`)
        .call(xAxis)

    svg.append("text")
        .attr("transform", `translate(${(width/2)}, ${(height + margin.top + 20)})`)
        .style("text-anchor", "middle")
        .text("Day");

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)

    svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left)
    .attr("x",0 - (height / 2))
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("Amount (1/m2)");

    svg.selectAll(".bar")
        .data(data)
      .enter().append("rect")
        .style("fill", "steelblue")
        .attr("x", (d) => x(d.day))
        .attr("width", x.bandwidth())
        .attr("y", (d) => y(d.amount))
        .attr("height", (d) => (height - y(d.amount)));
  }

  return <div ref={ref => ref !==  null && renderChart(ref)} />
};

export default WeatherApp_AmountOfRain;
