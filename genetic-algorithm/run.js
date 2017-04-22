const _ = require('lodash'),
    {debug, print} = require('./utils'),
    Population = require('./population'),
    population = new Population(),
    matrix = require('../pam250');

let gen,
    newGen,
    i=0;

gen = population.init();
newGen = population.process(gen);

while(true) {
    newGen = population.process(newGen);
    //debug(newGen);
    if(newGen.done) {
        print(newGen);
        console.log(`fitness evaluations: ${population.getFitnessEval()}`);
        break;
    }
    i++;
}//*/


