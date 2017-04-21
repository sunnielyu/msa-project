const _ = require('lodash'),
    {debug, print} = require('./utils'),
    Population = require('./population'),
    population = new Population();

let gen,
    newGen,
    i=0;

gen = population.init();
//debug(gen);
newGen = population.process(gen);

while(true) {
    newGen = population.process(newGen);
    //debug(newGen);
    if(newGen.done) {
        print(newGen);
        console.log(`Fitness evaluations: ${population.getFitnessEval()}`);
        break;
    }
    i++;
}
