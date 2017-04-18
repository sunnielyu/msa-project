const Gene = require('./gene'),
    Fitness = require('../fitness'),
    gene = new Gene(),
    fitness = new Fitness(),
    config = require('../config.json');

let pop = [],
    i = 0;

gene.loadGenes();
while(i<config.population) {
    pop.push(gene.reset());
    i++;
}
console.log(fitness.evaluate(pop[0]));
