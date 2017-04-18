const Gene = require('./gene'),
    gene = new Gene(),
    config = require('../config.json');

let pop = [],
    i = 0;

gene.loadGenes();
while(i<config.population) {
    pop.push(gene.reset());
    i++;
}
console.log(gene.isEqual(pop[0], pop[1]));
