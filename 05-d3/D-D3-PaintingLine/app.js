const width = 300;
const height = 150;
const marginTop = 30;
const marginRight = 30;
const marginBottom = 30;
const marginLeft = 50;
const title = 'Mapa';
const dataLine = [{x1:10,y1:10,x2:10,y2:110},{x1:10,y1:110,x2:100,y2:110}]




const svg = d3
.select('#map-container')
.append('svg')
.attr('width', width)
.attr('height', height)
.style('background-color', '#AAA');

svg
.append('text')
.attr('x', (marginLeft + width + marginRight) / 2)
.attr('y', marginTop / 2)
.attr('dy', '0.33em')
.text(title)
.attr('text-anchor', 'end')
.attr('color','green');

svg.select('line')
   .join('line')
   .style("stroke", "lightgreen")
   .style("stroke-width", 10)
   .data(dataLine)
   .attr('x1', d => d.x1)
   .attr('y1', d => d.y1)
   .attr('x2', d => d.x2)
   .attr('y2', d => d.y2)
