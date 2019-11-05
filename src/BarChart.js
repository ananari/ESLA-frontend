import React, {Component} from 'react';
import * as d3 from 'd3';

export default class BarChart extends Component {

  drawBarChart = data => {
    const barWidth = 40;
    const canvasWidth = (barWidth + 5) * Object.values(data).length - 5
    const heightInterval = 20;
    const canvasHeight = Math.max(...Object.values(data)) * heightInterval + 80;
    d3.selectAll("div.canvas > *").remove();
    const svgCanvas = d3.select(this.refs.canvas).append('svg').attr('width', canvasWidth).attr('height', canvasHeight).style('border', '1px solid black')
    const datavals = Object.values(data)
    svgCanvas.selectAll("rect").data(datavals).enter()
      .append("rect")
      .attr("width", barWidth)
      .attr("height", (datapoint) => datapoint * 20)
      .attr("fill", "#d4f0fc")
      .attr("x", (datapoint, iteration) => iteration * (barWidth + 5))
      .attr("y", (datapoint) => canvasHeight - datapoint * heightInterval)
    svgCanvas.selectAll("text.class")
    .data(Object.values(data)).enter()
      .append("text")
      .attr("class", "value")
      .attr("x", (dataPoint, i) => i * (barWidth + 5) + (15))
      .attr("y", (dataPoint, i) => canvasHeight - (dataPoint * heightInterval / 2) + 5)
      .text(dataPoint => dataPoint)

    function wrap(text, width) {
      text.each(function() {
        var text = d3.select(this),
            words = text.text().split(/\s+/).reverse(),
            word,
            line = [],
            lineNumber = 0,
            lineHeight = 1.1, // ems
            x = text.attr("x"),
            y = text.attr("y"),
            dy = 0,
            tspan = text.text(null).append("tspan").attr("x", x).attr("y", y).attr("dy", dy + "em");
        while (word = words.pop()) {
          line.push(word);
          tspan.text(line.join(" "));
          if (tspan.node().getComputedTextLength() > width) {
            line.pop();
            tspan.text(line.join(" "));
            line = [word];
            tspan = text.append("tspan").attr("x", x).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
          }
        }
      });
    }

    svgCanvas.selectAll("text.label")
    .data(Object.keys(data)).enter()
      .append("text")
      .attr("class","label")
      .style("font-size", "10px")
      .attr("x", (dataPoint, i) => i * (barWidth + 5))
      .attr("y", (dataPoint, i) => canvasHeight - (Object.values(data)[i] * heightInterval) - (dataPoint.length * 10/7))
      .text(dataPoint => dataPoint)
      .call(wrap, 45)

    
  }

  

  componentDidMount(){
    console.log(this.props.data)
  }

  componentDidUpdate(){
    this.drawBarChart(this.props.data)
  }

  
  render(){
    return(<div ref="canvas" className="canvas"></div>)
  }
}