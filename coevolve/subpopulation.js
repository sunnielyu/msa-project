const _ = require('lodash'),
    config = require('../config.json'),
    Gene = require('./gene'),
    Breed = require('./breed');

class Subpopulation {
    constructor() {
        this.gene = new Gene();
        this.breed = new Breed();
        this.size = config.population || 100;
    }

    init(item) {
        let i = 0,
            gen = {};
        gen.pop = [];

        while(i<this.size) {
            let obj = {};
            obj.seq = this.gene.reset(item.seq);
            gen.pop.push(obj);
            i++;
        }
        gen.name = item.name;
        return gen;
    }

    process(gen) {
        let subGen = gen.pop,
            newGen = {},
            weight = [];
        newGen.name = gen.name;

        newGen.pop = subGen.slice(0, this.size/2);
        _.forEach(newGen.pop, (gene, index) => {
            let normFit = (gene.score - subGen[this.size-1].score)/(subGen[0].score - subGen[this.size-1].score) * 10,
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
        newGen.weight = weight;
        while(newGen.pop.length < this.size) {
            this.breed.process(newGen);
        }
        return newGen;
    }
}

module.exports = Subpopulation;