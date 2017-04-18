let _ = require('lodash'),
    assert = require('assert'),
    config = require('../config.json'),
    Gene = require('./gene'),
    Fitness = require('../fitness');

class Population {
    constructor() {
        this.gene = new Gene();
        this.fitness = new Fitness();
        this.convergence = config.convergence || 100;
        this.size = config.population || 100;
    }

    init() {
        let i = 0,
            pop = [];
        this.gene.loadGenes();
        while(i<this.size) {
            pop.push(this.gene.reset());
            i++;
        }
        return pop;
    }

    process(pop) {
        _.forEach(pop, gene => {
            this.fitness.evaluate(gene);
        });
        pop.sort((a, b) => {
            return b.score - a.score;
        });
    }
}

module.exports = Population;