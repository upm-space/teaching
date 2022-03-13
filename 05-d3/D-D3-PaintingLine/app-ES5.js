const width = 300;
const height = 150;
const marginTop = 30;
const marginRight = 30;
const marginBottom = 30;
const marginLeft = 50;
const title = 'Mapa 1';
const dataLine = [{x1:10,y1:10,x2:10,y2:110},{x1:10,y1:110,x2:50,y2:110},{x1:50,y1:110,x2:50,y2:10}]
/*
const returnValue = (value)=>{
   return value;
}
*/

const mapContainer = d3.select('#map-container')


const svg = mapContainer.append('svg')
.style('width', width)
.style('height', height)
.style('background-color', '#AAD');

/*
.append('svg')
.style('width', width)
.style('height', height)
.style('background-color', '#AAA');
*/


svg
.append('text')
.attr('x', 70)
.attr('y', 15)
.attr('dy', '0.33em')
.text(title)
.attr('text-anchor', 'end')
.attr('color','green');


svg.append('line')
   .style("stroke", "lightgreen")
   .style("stroke-width", 1)
   .attr('x1', 0)
   .attr('y1', 0)
   .attr('x2', 100)
   .attr('y2', 100)

svg.append('line')
   .style("stroke", "lightgreen")
   .style("stroke-width", 1)
   .attr('x1', 0)
   .attr('y1', 0)
   .attr('x2', 100)
   .attr('y2', 200)

svg.append('line')
   .style("stroke", "lightgreen")
   .style("stroke-width", 1)
   .attr('x1', 0)
   .attr('y1', 0)
   .attr('x2', 100)
   .attr('y2', 300)

svg.append('line')
   .style("stroke", "lightgreen")
   .style("stroke-width", 1)
   .attr('x1', 0)
   .attr('y1', 0)
   .attr('x2', 100)
   .attr('y2', 400)



svg.selectAll('line')
   .style("stroke", "lightgreen")
   .style("stroke-width", 1)
   .data(dataLine)
   .join('line')
   .attr('x1', d => d.x1)
   .attr('y1', d => d.y1)
   .attr('x2', d => d.x2)
   .attr('y2', d => d.y2)


