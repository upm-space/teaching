const data = [10,20,30,40,50]

d3.select('ul')         //select the first ul element foung in the page
   .selectAll('li')     //select all li elements inside ul
   .data(data)          //asociate each data item with each li element found
   .join('li')          //if there are not enought li elements, by using join create a new one an associate it to the element
                        // also will remove elements if there are more than the array
   .text(function(d){return d})  // better to use ES6 : d => d