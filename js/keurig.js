var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = 1060 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var formatDate = d3.time.format("%H:%M %p");

var x = d3.time.scale()
    .range([0, width]);

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

var line = d3.svg.line()
    .x(function(d) { return x(d.unix_time * 1000); })
    .y(function(d) { return y(d.avg_watt); })
    .interpolate("basis");

var svg = d3.select("#chart1").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var zoom = d3.behavior.zoom()
    .on("zoom", draw);

var url = 'data/stats.json'
d3.json(url, function(error, data) {
  if (error) throw error;
  //data.forEach(function(d){
    //console.log(d.unix_time);
    //console.log(d.avg_watt);
  //})
  x.domain(d3.extent(data, function(d) { return (d.unix_time * 1000); }));
  y.domain(d3.extent(data, function(d) { return d.avg_watt; }));
  zoom.x(x);

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Avg Watts");

  svg.append("path")
      .datum(data)
      .attr("class", "line")
      .attr("d", line);

  svg.append("rect")
    .attr("class", "pane")
    .attr("width", width)
    .attr("height", height)
    .call(zoom);

  draw();
});

function draw() {
  svg.select("g.x.axis").call(xAxis);
  svg.select("g.y.axis").call(yAxis);
  svg.select("path.line").attr("d", line);
}

function type(d) {
  //d.date = formatDate.parse(d.date);
  d.unix_time = d.unix_time * 1000
  //d.close = +d.close;
  d.avg_watt = d.avg_watt;
  return d;
}

function updateData(t) {
  //console.log(t);
  var url_target = '';
  if(t == 'day') {
    url_target = 'http://52.201.115.227/daystats';
  }
  else if (t == 'hour') {
    url_target = 'http://52.201.115.227/stats';
  }
  else if (t == 'week') {
    url_target = 'http://52.201.115.227/weekstats';
  }
  //console.log(url_target);
  d3.json(url_target, function(error, data) {
  if (error) throw error;
  //data.forEach(function(d){
    //console.log(d.unix_time);
    //console.log(d.avg_watt);
  //})
  x.domain(d3.extent(data, function(d) { return (d.unix_time * 1000); }));
  y.domain(d3.extent(data, function(d) { return d.avg_watt; }));

  var svg = d3.select("body").transition();

  // Make the changes
        svg.select(".line")   // change the line
            .duration(750)
            .attr("d", line(data));
        svg.select(".x.axis") // change the x axis
            .duration(750)
            .call(xAxis);
        svg.select(".y.axis") // change the y axis
            .duration(750)
            .call(yAxis);

});

}