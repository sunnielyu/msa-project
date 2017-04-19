const _ = require('lodash'),
    {debug} = require('../utils'),
    Population = require('./population'),
    population = new Population();

let gen,
    newGen;

let i=0;

gen = population.init();
//console.log(gen);
newGen = population.process(gen);

while(true) {
    newGen = population.process(newGen);
    //debug(newGen);
    if(newGen.done) {
        print(newGen);
        break;
    }
    i++;
}

function print(x) {
    console.log(`Generation #${x.iter}:`);
    console.log(`Best fitness score: ${x.max}`);
    console.log(`Best alignment: `);
    _.forEach(x.pop[0].gene, gene => {
        console.log(gene.name);
        console.log(gene.seq);
    });
}
