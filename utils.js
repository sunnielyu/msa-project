const _ = require('lodash');

function debug(x) {
    console.log(`generation: ${x.iter}, max: ${x.max}, convergence: ${x.convergence}`);
    console.log(`weight: ${x.weight}`);
    _.forEach(x.pop, pop => {
        console.log(pop);
    });
}

function print(x) {
    console.log(`Generation #${x.iter}:`);
    console.log(`Best fitness score: ${x.max}`);
    console.log(`Best alignment: `);
    _.forEach(x.pop[0].gene, gene => {
        console.log(gene.name);
        console.log(gene.seq);
    });
}

module.exports = {
    debug: debug,
    print: pring
};