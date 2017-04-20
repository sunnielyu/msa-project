const config = require('../config.json'),
    _ = require('lodash'),
    assert = require('assert'),
    fs = require('fs');

class Gene {
    constructor() {
        this.files = config.files;
        this.initOffset = config.initOffset || 50;
        this.seqs = [];
    }

    loadGenes() {
        _.forEach(this.files, file => {
            let re = /(>.+)\n([\w\n]+)/,
                item = fs.readFileSync(file, 'utf-8'),
                match = re.exec(item),
                name = match[1],
                seq = match[2].replace(/\n/g, '');

            this.seqs.push({name, seq});
        });
        return this.seqs;
    }

    reset(seq) {
        assert.ok(!_.isEmpty(seq), 'reset: `seq` cannot be empty.');
        let rand = Math.floor(Math.random() * (this.initOffset + 1));
        return ('-'.repeat(rand)) + seq;
    }
}

module.exports = Gene;