const _ = require('lodash');

function debug(x) {
    console.log(`generation: ${x.iter}, max: ${x.max}, convergence: ${x.convergence}`);
    _.forEach(x.pop, pop => {
        console.log(`seq: ${pop.name}`);
        _.forEach(pop.pop, subpop => {
            console.log(subpop.seq + `\tfitness: ${subpop.score}`);
        });
    });
}

function print(x) {
    console.log(`Generation #${x.iter}:`);
    console.log(`Best fitness score: ${x.max}`);
    console.log(`Best alignment: `);
    _.forEach(x.final, item => {
        console.log(item.name);
        console.log(item.seq);
    });
}

module.exports = {
    debug: debug,
    print: print
};