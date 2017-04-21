const _ = require('lodash'),
    config = require('../config.json'),
    Gene = require('./gene'),
    Subpopulation = require('./subpopulation'),
    Fitness = require('./fitness');

class Population {
    constructor() {
        this.gene = new Gene();
        this.subpopulation = new Subpopulation();
        this.fitness = new Fitness();
        this.convergence = config.convergence || 100;
        this.maxGenerations = config.maxGenerations || 10000;
        this.fe = 0;
    }

    getFitnessEval() {
        return this.fe;
    }

    init() {
        let loadedSeqs,
            gen = {};
        gen.pop = [];

        loadedSeqs = this.gene.loadGenes();
        _.forEach(loadedSeqs, item => {
            gen.pop.push(this.subpopulation.init(item));
        });
        this.fe += this.fitness.evaluate(gen);
        gen.convergence = 0;
        gen.iter = 0;
        return gen;
    }

    process(gen) {
        if(gen.convergence > this.convergence || gen.iter > this.maxGenerations) {
            let final = [];
            gen.done = true;
            _.forEach(gen.pop, subGen => {
                subGen.pop[0].name = subGen.name;
                final.push(subGen.pop[0]);
            });
            gen.final = final;
            return gen;
        }
        let newGen = {};
        newGen.pop = [];

        newGen.iter = gen.iter + 1;
        _.forEach(gen.pop, subGen => {
            newGen.pop.push(this.subpopulation.process(subGen));
        });
        this.fe += this.fitness.evaluate(newGen);

        newGen.convergence = newGen.max === gen.max ? gen.convergence + 1 : 0;

        return newGen;
    }
}

module.exports = Population;