const _ = require('lodash'),
    {debug, print} = require('./utils'),
    Population = require('./population'),
    population = new Population();

let gen,
    newGen;

let i=0;

gen = population.init();
//debug(gen);
newGen = population.process(gen);
//debug(newGen);

while(true) {
    newGen = population.process(newGen);
    //debug(newGen);
    if(newGen.done) {
        debug(newGen);
        break;
    }
    i++;
}
