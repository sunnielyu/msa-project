const _ = require('lodash'),
    assert = require('assert'),
    config = require('../config.json'),
    {debug} = require('./utils'),
    Fitness = require('./fitness'),
    fitness = new Fitness();

class Breed {
    constructor() {}

    process(gen) {
        //debug(gen);
        //assert.ok(!_.isEmpty(gen.weight), 'Breed.process: Invalid `weight` array.' + gen.iter);

        let x = gen.weight[Math.floor(Math.random() * gen.weight.length)],
            y = gen.weight[Math.floor(Math.random() * gen.weight.length)];

        if(Math.random() > 0.5) {
            gen.pop.push(crossover(gen.pop[x], gen.pop[y]));
        } else {
            gen.pop.push(gapInsertion(gen.pop[x]));
        }
    }
}

function crossover(x, y) {
    let aln1 = {},
        aln2 = {},
        aMax = 0,
        bMax = 0;
    aln1.gene = [];
    aln2.gene = [];

    _.forEach(x.gene, (gene, index) => {
        let z = gene.seq.length < y.gene[index].seq.length ? gene.seq.length : y.gene[index].seq.length;
        let point = Math.floor(Math.random() * z),
            i = 0,
            j = 0,
            a = [],
            b = [];
        while(i!=point) {
            a.push(gene.seq[a.length]);
            if(gene.seq[a.length-1] !== '-') {
                i++;
            }
        }
        while(j!=point) {
            b.push(y.gene[index].seq[b.length]);
            if(y.gene[index].seq[b.length-1] !== '-') {
                j++;
            }
        }
        aln1.gene.push({name: gene.name, seq: a.join('') + y.gene[index].seq.slice(b.length)});
        aln2.gene.push({name: gene.name, seq: b.join('') + gene.seq.slice(a.length)});
        if(aln1.gene[index].seq.length > aMax) {
            aMax = aln1.gene[index].seq.length;
        }
        if(aln2.gene[index].seq.length > bMax) {
            bMax = aln2.gene[index].seq.length;
        }
    });
    aln1.len = aMax;
    aln2.len = bMax;

    fitness.evaluate(aln1);
    fitness.evaluate(aln2);

    return aln1.score > aln2.score ? aln1 : aln2;
}

function gapInsertion(x) {
    let aln = {},
        max = 0;
    aln.gene = [];
    _.forEach(x.gene, gene => {
        let gap = ('-'.repeat(Math.floor(Math.random() * (5)))),
            location = Math.floor(Math.random() * gene.seq.length),
            newSeq = gene.seq.slice(0, location) + gap + gene.seq.slice(location);
        aln.gene.push({name: gene.name, seq: newSeq});
        if(newSeq.length > max) {
            max = newSeq.length;
        }
    });
    aln.len = max;
    return aln;
}

module.exports = Breed;