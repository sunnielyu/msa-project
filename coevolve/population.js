const _ = require('lodash'),
    config = require('../config.json'),
    Gene = require('./gene'),
    Fitness = require('../fitness'),
    Breed = require('./breed');

class Population {
    constructor() {
        this.gene = new Gene();
        this.fitness = new Fitness();
        this.breed = new Breed();
        this.convergence = config.convergence || 100;
        this.size = config.population || 100;
    }

    init() {
        let i = 0,
            gen = {};
        gen.pop = [];
        this.gene.loadGenes();
        while(i<this.size) {
            gen.pop.push(this.gene.reset());
            i++;
        }
        gen.convergence = 0;
        gen.max = Number.NEGATIVE_INFINITY;
        gen.iter = 0;
        return gen;
    }

    process(gen) {
        if(gen.convergence > this.convergence) {
            gen.done = true;
            return gen;
        }
        let newGen = {},
            min,
            max,
            weight = [];

        newGen.iter = gen.iter + 1;
        _.forEach(gen.pop, gene => {
            this.fitness.evaluate(gene);
            if(!max || gene.score > max) {
                max = gene.score;
            }
            if(!min || gene.score < min) {
                min = gene.score;
            }
        });

        if(gen.max === max) {
            newGen.convergence = gen.convergence + 1;
        } else {
            newGen.convergence = 0;
        }
        newGen.max = max;

        gen.pop.sort((a, b) => {
            return b.score - a.score;
        });

        newGen.pop = gen.pop.slice(0, this.size/2);
        _.forEach(newGen.pop, (gene, index) => {
            let normFit = (gene.score - min)/(max - min) * 10,
                i = 0;
            if(!normFit) {
                weight.push(index);
            } else {
                while(i<normFit) {
                    weight.push(index);
                    i++;
                }
            }
        });
        if(_.isEmpty(weight)) {
            console.log(newGen);
        }
        newGen.weight = weight;
        while(newGen.pop.length < this.size) {
            this.breed.process(newGen);
        }
        return newGen;
    }
}

module.exports = Population;