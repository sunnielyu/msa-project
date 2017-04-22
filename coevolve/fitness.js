const _ = require('lodash'),
    config = require('../config.json'),
    matrix = require('../pam250');

class Fitness {
    constructor() {}

    evaluate(gen) {
        let gap = config.gap || -4,
            sizePenalty = config.sizePenalty || 10,
            count = 0;

            function getScore(genome) {
                let score = 0;

                for(let n=0; n<genome.len; n++) {
                    for(let i=0; i<genome.gene.length; i++) {
                        for(let j=i+1; j<genome.gene.length; j++) {
                            let a = genome.gene[i].seq[n] || '-',
                                b = genome.gene[j].seq[n] || '-';

                            if(a !== '-' && b !== '-') {
                                score += matrix(a, b);
                            } else if(a !== b) {
                                score += gap;
                            }
                        }
                    }
                }
                count += 1;
                return score;
            }

        let topAln = [],
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
                if((gene.seq.length - pop.orig)/pop.orig < 0.1) {
                    gene.score = Math.floor(getScore(obj));
                } else if((gene.seq.length - pop.orig)/pop.orig < 0.5) {
                    gene.score = Math.floor(getScore(obj) - (sizePenalty * ((gene.seq.length - pop.orig)/pop.orig)));
                } else {
                    gene.score = Math.floor(getScore(obj) - 10000);
                }
                //console.log(gen);

                if(gene.score > gen.best.score) {
                    gen.best.score = gene.score;
                    gen.best.aln = obj.gene;
                }
            });
            pop.pop.sort((a, b) => {
                return b.score - a.score;
            });
            gen.max = gen.best.score;
        });
        return count;
    }

}

module.exports = Fitness;