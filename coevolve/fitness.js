const _ = require('lodash'),
    config = require('../config.json');

class Fitness {
    constructor() {}

    evaluate(gen) {
        let match = config.match || 1,
            mismatch = config.mismatch || -1,
            gap = config.gap || -2;

            function getScore(genome) {
            let score = 0;

            for(let n=0; n<genome.len; n++) {
                for(let i=0; i<genome.gene.length; i++) {
                    for(let j=i+1; j<genome.gene.length; j++) {
                        let a = genome.gene[i].seq[n] || '-',
                            b = genome.gene[j].seq[n] || '-';

                        if(a === b) {
                            if(a !== '-') {
                                score += match;
                            }
                        } else if(a !== b) {
                            if(a === '-' || b === '-') {
                                score += gap;
                            } else {
                                score += mismatch;
                            }
                        }
                    }
                }
            }
            return score;
        }

        let topAln = [],
            maxScore = Number.NEGATIVE_INFINITY,
            subGen = gen.pop;

        _.forEach(subGen, pop => {
            topAln.push({seq: pop.pop[0].seq});
        });
        _.forEach(subGen, (pop, index) => {
            let obj = {};
            obj.gene = _.clone(topAln);
            _.forEach(pop.pop, gene => {
                let max = 0;
                obj.gene[index].seq = gene.seq;
                _.forEach(obj.gene, item => {
                    if(item.seq.length > max) {
                        max = item.seq.length;
                    }
                });
                obj.len = max;
                gene.score = getScore(obj);
            });
            pop.pop.sort((a, b) => {
                return b.score - a.score;
            });
            if(pop.pop[0].score > maxScore) {
                maxScore = pop.pop[0].score;
            }
        });
        gen.max = maxScore;
        return gen;
    }

}

module.exports = Fitness;