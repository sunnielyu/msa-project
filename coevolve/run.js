const _ = require('lodash'),
    {debug, print} = require('../utils'),
    Population = require('./population'),
    population = new Population();

let gen,
    newGen;

let i=0;

gen = population.init();
//console.log(gen);
/*newGen = population.process(gen);

while(true) {
    newGen = population.process(newGen);
    //debug(newGen);
    if(newGen.done) {
        print(newGen);
        break;
    }
    i++;
}*/


