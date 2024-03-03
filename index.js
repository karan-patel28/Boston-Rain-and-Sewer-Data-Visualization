// Set the dimensions of the canvas / graph
// Adjusted margins
const margin = { top: 30, right: 30, bottom: 45, left: 50 },
    width = 800 - margin.left - margin.right,   // Increased width
    height = 400 - margin.top - margin.bottom;  // Increased height

// ...rest of your D3.js code


// Set up the SVG with the specified dimensions
const svg = d3.select("#annual-chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Load the data from the CSV file
d3.csv("Dataset/Dorchester_Rainfall_Pivot_2011_2018.csv").then(function (data) {
    // Process data to get annual totals
    data.forEach(function (d) {
        d.totalRainfall = d3.sum(Object.values(d).slice(1)); // Sum all months
    });

    // Set the ranges for x and y axes
    const x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
        y = d3.scaleLinear().range([height, 0]);

    // Define the axes
    const xAxis = d3.axisBottom(x).tickFormat(d3.format("d")),
        yAxis = d3.axisLeft(y).ticks(10);

    // Scale the range of the data in the domains
    x.domain(data.map(function (d) { return d.Year; }));
    y.domain([0, d3.max(data, function (d) { return d.totalRainfall; })]);

    // Add the X Axis
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-65)");

    // Add the Y Axis
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis);

    // Add the bars
    svg.selectAll("bar")
        .data(data)
        .enter().append("rect")
        .style("fill", "steelblue")
        .attr("x", function (d) { return x(d.Year); })
        .attr("width", x.bandwidth())
        .attr("y", function (d) { return y(d.totalRainfall); })
        .attr("height", function (d) { return height - y(d.totalRainfall); });
});


// Summer 2011

// Assuming d3.js library is already included in your HTML

// Function to create a chart for the summer months of a given year
function createSummerChart(year, data, chartId) {

    const color = d3.scaleOrdinal(d3.schemeCategory10);
    // Filter data to get only the summer months of the specified year
    const summerMonths = data.filter(d => d.Year == year.toString()).map(d => ({
        month: 'June', value: +d.June
    })).concat(
        data.filter(d => d.Year == year.toString()).map(d => ({
            month: 'July', value: +d.July
        }))
    ).concat(
        data.filter(d => d.Year == year.toString()).map(d => ({
            month: 'August', value: +d.August
        }))
    );

    // Set the ranges for x and y axes
    const x = d3.scaleBand()
        .rangeRound([0, width])
        .padding(0.1)
        .domain(summerMonths.map(d => d.month));

    const y = d3.scaleLinear()
        .range([height, 0])
        .domain([0, d3.max(summerMonths, d => d.value)]);

    // Select the chart container and append an SVG
    const svg = d3.select(chartId).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Add the X Axis
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    // Add the Y Axis
    svg.append("g")
        .call(d3.axisLeft(y));

    // Add the bars
    svg.selectAll(".bar")
        .data(summerMonths)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", d => x(d.month))
        .attr("width", x.bandwidth())
        .attr("y", d => y(d.value))
        .attr("height", d => height - y(d.value))
        .attr("fill", (d, i) => color(i));
}

document.addEventListener('DOMContentLoaded', function () {
    d3.csv("Dataset/Dorchester_Rainfall_Pivot_2011_2018.csv").then(function (data) {
        // Get the unique years from the dataset
        const years = [...new Set(data.map(d => d.Year))];

        // For each year, create a chart for the summer months
        years.forEach(year => {
            const chartId = `#summer-${year}-chart`; // You need to have a div with this id for each chart
            const colorScale = d3.scaleOrdinal(d3.schemeCategory10); // Or any other D3 color scale of your choice
            createSummerChart(year, data, chartId, colorScale);
        });
    });
});



window.onload = function() {
    // Create the SVG element
    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("width", "855");
    svg.setAttribute("height", "430");
    svg.setAttribute("version", "1.1");
  
    // Function to create a rectangle
    function createRectangle(x, y, width, height, color) {
      const rect = document.createElementNS(svgNS, "rect");
      rect.setAttribute("x", x);
      rect.setAttribute("y", y);
      rect.setAttribute("width", width);
      rect.setAttribute("height", height);
      rect.setAttribute("fill", color);
      svg.appendChild(rect);
    }
  
    // Function to create text
    function createText(x, y, content, fontSize = "10", anchor = "middle") {
      const text = document.createElementNS(svgNS, "text");
      text.setAttribute("x", x);
      text.setAttribute("y", y);
      text.setAttribute("font-size", fontSize);
      text.setAttribute("text-anchor", anchor);
      text.textContent = content;
      svg.appendChild(text);
    }
  
    // Constants for the bar chart
    const barWidth = 40;
    const barSpacing = 20;
    const offsetX = 30;
    const offsetY = 400;
    const scale = 7; // Scale for the bar heights
  
    // Data for the bars
    const data = [56.2, 37.34, 42.77, 47.14, 22.47, 32.69, 43.55, 50.33];
  
    // Create bars
    data.forEach((value, index) => {
      createRectangle(
        (index * (barWidth + barSpacing)) + offsetX,
        offsetY - (value * scale),
        barWidth,
        value * scale,
        "#0077b6" // Blue color
      );
    });
  
    // Create labels for the x-axis
    data.forEach((value, index) => {
      createText(
        (index * (barWidth + barSpacing)) + offsetX + (barWidth / 2),
        offsetY + 20,
        (2011 + index).toString(),
        "15"
      );
    });
  
    // Append the SVG to the chart div
    document.getElementById('chart').appendChild(svg);
  }