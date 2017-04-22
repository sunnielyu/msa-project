const _ = require('lodash'),
    config = require('../config.json'),
    matrix = require('../pam250');

class Fitness {
    constructor() {
        this.gap = config.gap || -4;
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

                    if(a !== '-' && b !== '-') {
                        score += matrix(a, b);
                    } else if(a !== b) {
                        score += this.gap;
                    }
                }
            }
        }
        genome.score = score;
        return 1;
    }
}

module.exports = Fitness;