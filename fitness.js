const _ = require('lodash'),
    assert = require('assert'),
    config = require('./config.json');

class Fitness {
    constructor() {
        this.match = config.match || 1;
        this.mismatch = config.mismatch || -1;
        this.gap = config.gap || -2;
    }

    evaluate(genome) {
        assert.ok(!_.isEmpty(genome), 'Fitness: Invalid `genome` parameter.');
        if(genome.score) {
            return genome.score;
        }

        let score = 0;

        for(let n=0; n<genome.len; n++) {
            for(let i=0; i<genome.gene.length; i++) {
                for(let j=i+1; j<genome.gene.length; j++) {
                    let a = genome.gene[i].seq[n] || '-',
                        b = genome.gene[j].seq[n] || '-';

                    if(a === b) {
                        if(a !== '-') {
                            score += this.match;
                        }
                    } else if(a !== b) {
                        if(a === '-' || b === '-') {
                            score += this.gap;
                        } else {
                            score += this.mismatch;
                        }
                    }
                }
            }
        }
        return genome.score = score;
    }
}

module.exports = Fitness;