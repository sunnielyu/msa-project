const Population = require('./population'),
    population = new Population();

let pop;

pop = population.init();
population.process(pop);
console.log(pop);