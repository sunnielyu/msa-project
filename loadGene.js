var files = require('./config.json').files;

class Gene {
    constructor() {
        this.files = files;
    }

    loadGenes() {
        return this.files;
    }

}

module.exports = Gene;