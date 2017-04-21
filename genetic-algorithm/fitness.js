const _ = require('lodash'),
    config = require('../config.json');

class Fitness {
    constructor() {
        this.match = config.match || 1;
        this.mismatch = config.mismatch || -1;
        this.gap = config.gap || -2;
    }

    evaluate(genome) {
        if(genome.score) {
            return 0;
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
        genome.score = score;
        return 1;
    }
}

module.exports = Fitness;