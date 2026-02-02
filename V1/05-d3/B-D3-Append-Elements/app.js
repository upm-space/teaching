// Selection
const body = d3.select('body');

// Append
const pElement1 = body.append('p');
const pElement2 = body.append('p');
const svg = body.append('svg');


/*
Transformations. There are several types of transformation
   - attr has two attributes. The first one the type of the attribute and the second one the value of the attribute.
   - text the text inside the tag.
   - style has two attributes. the first one the css attribute and the second one the value of the attribute.
*/

pElement1
   .attr('class', 'claseP')  // be carefull using that if there are a previous class it will be erased
   .text('d3 is great !!')
   .style('color', 'blue')

/*
Styles
   - por medio de la propiedad classed, con el segundo atributo a true se pueden agregar tantas clases como queramos
*/

pElement2
   .classed('clasep1', true) 
   .classed('clasep2', true)
   .text('yeah !!')

svg.classed('map-container', true)