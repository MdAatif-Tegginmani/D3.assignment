import  { useState, useEffect } from "react";
import * as d3 from "d3";
// import "./BarCh.css"; // Import the CSS file for the component


const BarChart = () => {
  const [data] = useState([
    {
      name: "A",
      value: 50,
      tax :3000 ,
    },
    {
      name: "B",
      value: 20,
      tax :1500 ,
    },
    {
      name: "C",
      value: 40,
      tax :1000 ,
    },
    {
      name: "D",
      value: 70,
      tax :5000 ,
    },
    {
        name: "E",
        value: 89,
        tax :9000 ,
      },
  ]);

  useEffect(() => {
    const margin = { top: 90, right: 20, bottom: 30, left: 90 };
    const width = 660 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;

    const x = d3.scaleBand().range([0, width]).padding(0.3);
    const y = d3.scaleLinear().range([height, 0]);

    const svg = d3
      .select(".bar-chart")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    x.domain(
      data.map(function (d) {
        return d.name;
      })
    );
    y.domain([
      0,
      d3.max(data, function (d) {
        return d.tax;
      }),
    ]);

    svg
      .selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", function (d) {
        return x(d.name);
      })
      .attr("width", x.bandwidth())
      .attr("y", function (d) {
        return y(d.tax);
      })
      .attr("height", function (d) {
        return height - y(d.tax);
      });

    svg
      .append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    svg.append("g").call(d3.axisLeft(y));
    return () => {
        d3.select(".bar-chart svg").remove();
    }
  }, [data]);

  return (
    
    <div className="bar-chart">
      
      
    </div>
  
);
; }; 

export default BarChart;