/*

In-class activity 08 starter code
Prof. Mosca 
Modified: 12/08/21 

*/

// Build your bar charts in this file

// Set dimensions and margins for plots
const width = 900;
const height = 450;
const margin = { left: 50, right: 50, bottom: 50, top: 50 };
const yTooltipOffset = 15;

// TODO: What does this code do?
// this code is adding styling to the selected svg with the id #hard-coded-bar
const svg1 = d3
  .select("#hard-coded-bar")
  .append("svg")
  .attr("width", width - margin.left - margin.right)
  .attr("height", height - margin.top - margin.bottom)
  .attr("viewBox", [0, 0, width, height]);

// Hardcoded barchart data
const data1 = [
  { name: "A", score: 92 },
  { name: "B", score: 15 },
  { name: "C", score: 67 },
  { name: "D", score: 89 },
  { name: "E", score: 53 },
  { name: "F", score: 91 },
  { name: "G", score: 18 },
];

/*

  Axes

*/

// TODO: What does this code do?
// this is returning the max score found
let maxY1 = d3.max(data1, function (d) {
  return d.score;
});

// TODO: What does each line of this code do?
let yScale1 = d3
  .scaleLinear() // linear scale for linear data
  .domain([0, maxY1]) // inputs for functions
  .range([height - margin.bottom, margin.top]); // outputs for function

// TODO: What does each line of this code do?
let xScale1 = d3
  .scaleBand() // scale for categorical/ordinal data
  .domain(d3.range(data1.length)) // inputs for funtion
  .range([margin.left, width - margin.right]) // outputs for function
  .padding(0.1); // padding between bars

// TODO: What does each line of this code do?
svg1
  .append("g") // appending to svg, and g is a placeholder for svg
  .attr("transform", `translate(${margin.left}, 0)`)
  // ^ move axis inside of left margin
  .call(d3.axisLeft(yScale1)) // built in function for left
  // axis given a scale function
  .attr("font-size", "20px"); // set font size

// TODO: What does each line of this code do?
svg1
  .append("g") // appending to svg, and g is a placeholder for svg
  .attr("transform", `translate(0,${height - margin.bottom})`)
  // ^ move axis inside of left margin
  .call(
    d3
      .axisBottom(xScale1) // built in function for bottom axis
      .tickFormat((i) => data1[i].name)
  ) // formatting x ticks
  .attr("font-size", "20px"); // set font size

/* 

  Tooltip Set-up  

*/

// TODO: What does each line of this code do?
// added div with styling to the id #hard-coded-bar
const tooltip1 = d3
  .select("#hard-coded-bar")
  .append("div")
  .attr("id", "tooltip1")
  .style("opacity", 0)
  .attr("class", "tooltip");

// TODO: What does each line of this code do?
// event handler for mouseover - shows tooltip with name and
// score when you mouse over bar
const mouseover1 = function (event, d) {
  tooltip1
    .html("Name: " + d.name + "<br> Score: " + d.score + "<br>")
    .style("opacity", 1);
};

// TODO: What does each line of this code do?
// event handler for when the mouse moves - positions tooltip at same x
// and y value as mouse, but offset to below mouse
const mousemove1 = function (event, d) {
  tooltip1
    .style("left", event.x + "px")
    .style("top", event.y + yTooltipOffset + "px");
};

// TODO: What does this code do?
// gets rid of tooltip when the mouse is not over the bar
const mouseleave1 = function (event, d) {
  tooltip1.style("opacity", 0);
};

/* 

  Bars 

*/

// TODO: What does each line of this code do?
//
svg1
  .selectAll(".bar")
  .data(data1)
  .enter()
  .append("rect")
  .attr("class", "bar")
  .attr("x", (d, i) => xScale1(i))
  .attr("y", (d) => yScale1(d.score))
  .attr("height", (d) => height - margin.bottom - yScale1(d.score))
  .attr("width", xScale1.bandwidth())
  .on("mouseover", mouseover1)
  .on("mousemove", mousemove1)
  .on("mouseleave", mouseleave1);
