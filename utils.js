const _ = require('lodash');

function debug(x) {
    console.log(`generation: ${x.iter}, max: ${x.max}, convergence: ${x.convergence}`);
    console.log(`weight: ${x.weight}`);
    _.forEach(x.pop, pop => {
        console.log(pop);
    });
}

module.exports = {
    debug: debug
};