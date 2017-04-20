const _ = require('lodash'),
    assert = require('assert'),
    config = require('../config.json'),
    {debug} = require('./utils'),
    Fitness = require('./fitness'),
    fitness = new Fitness();

class Breed {
    constructor() {}

    process(gen) {
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
    let z = x.seq.length < y.seq.length ? x.seq.length : y.seq.length;
    let point = Math.floor(Math.random() * z),
        i = 0,
        j = 0,
        a = [],
        b = [];
    while(i!=point) {
        a.push(x.seq[a.length]);
        if(x.seq[a.length-1] !== '-') {
            i++;
        }
    }
    while(j!=point) {
        b.push(y.seq[b.length]);
        if(y.seq[b.length-1] !== '-') {
            j++;
        }
    }
    return {seq: a.join('') + y.seq.slice(b.length)};
}

function gapInsertion(x) {
    let gap = ('-'.repeat(Math.floor(Math.random() * (5)))),
        location = Math.floor(Math.random() * x.seq.length),
        newSeq = x.seq.slice(0, location) + gap + x.seq.slice(location);
    return {seq: newSeq};
}

module.exports = Breed;