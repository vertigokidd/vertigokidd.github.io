var totalJobs = { "four": 130747.0, "five": 132753.0, "six": 135402.0,
                  "seven": 137448.0, "eight": 138365.0, "nine": 133976.0,
                  "ten": 129705.0, "eleven": 130815.0, "twelve": 133188.0,
                  "thirteen": 135261.0, "fourteen": 137499.0 }

var currentYear = "four";

var currentYearNum = "2004"

d3.json("jobs.json", function(error, json) {
  if (error) return console.warn(error);
  dataNest = json;

var margin = {top: 40, right: 10, bottom: 10, left: 10},
    width = 1200 - margin.left - margin.right,
    height = 800 - margin.top - margin.bottom;

var color = d3.scale.category20c();

var treemap = d3.layout.treemap()
    .size([width, height])
    .sticky(true)
    // .mode(["dice"])
    .sort(function(a, b) { return a.value - b.value })
    .value(function(d) { return d.four; });

var div = d3.select("body").append("div")
    .style("position", "relative")
    .style("width", (width + margin.left + margin.right) + "px")
    .style("height", (height + margin.top + margin.bottom) + "px")
    .style("left", margin.left + "px")
    .style("top", margin.top + "px");

var tip = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("position", "absolute");

  var node = div.datum(dataNest).selectAll(".node")
      .data(treemap.nodes)
    .enter().append("div")
      .attr("class", "node")
      .call(position)
      .style("background", function(d) { return d.children ? color(d.name) : null; })
      .text(function(d) { return d.children ? null : d.name; })
      .on("mouseover", function(d) { 
        tip.html("<strong>Year:</strong> " + currentYearNum + "<br>"
                 + "<strong>Catgeory:</strong> " + d.parent.name + "<br>" 
                 + "<strong>Industry:</strong> " + d.name + "<br>"
                 + "<strong># Jobs:</strong> " + d.value + " (in thousands)")
          .transition()        
          .duration(500)
          .style("top", d.y + d.dy / 2)
          .style("left", d.x + 40)
          .style("opacity", 0.9)
      });

  d3.selectAll("input").on("change", function change() {

    var value = this.value;

      switch (value)
      {
        case "four":
          value = function(d) { return d.four; }
          currentYearNum = "2004"
          break;
        case "five":
          value = function(d) { return d.five; }
          currentYearNum = "2005"
          break;
        case "six":
          value = function(d) { return d.six; }
          currentYearNum = "2006"
          break;
        case "seven":
          value = function(d) { return d.seven; }
          currentYearNum = "2007"
          break;
        case "eight":
          value = function(d) { return d.eight; }
          currentYearNum = "2008"
          break;
        case "nine":
          value = function(d) { return d.nine; }
          currentYearNum = "2009"
          break;
        case "ten":
          value = function(d) { return d.ten; }
          currentYearNum = "2010"
          break;
        case "eleven":
          value = function(d) { return d.eleven; }
          currentYearNum = "2011"
          break;
        case "twelve":
          value = function(d) { return d.twelve; }
          currentYearNum = "2012"
          break;
        case "thirteen":
          value = function(d) { return d.thirteen; }
          currentYearNum = "2013"
          break;
        case "fourteen":
          value = function(d) { return d.fourteen; }
          currentYearNum = "2014"
          break;
      }

    node
        .data(treemap.value(value).nodes)
      .transition()
        .duration(1500)
        .call(position);
  });

function position() {
  this.style("left", function(d) { return d.x + "px"; })
      .style("top", function(d) { return d.y + "px"; })
      .style("width", function(d) { return Math.max(0, d.dx - 1) + "px"; })
      .style("height", function(d) { return Math.max(0, d.dy - 1) + "px"; });
}




});
