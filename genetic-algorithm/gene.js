var config = require('../config.json'),
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
        assert.ok(!_.isEmpty(this.files), 'loadGenes: Invalid `files` parameter.');

        _.forEach(this.files, file => {
            let re = /(>.+)\n([\w\n]+)/,
                item = fs.readFileSync(file, 'utf-8'),
                match = re.exec(item),
                name = match[1],
                seq = match[2].replace(/\n/g, '');

            this.seqs.push({name, seq});
        });
    }

    reset() {
        assert.ok(!_.isEmpty(this.seqs), 'reset: `seq` cannot be empty.');

        let aln = {},
            max = 0;
        aln.gene = [];

        _.forEach(this.seqs, item => {
            let rand = (Math.random() * this.initOffset + 1),
                obj = _.clone(item);
            obj.seq = ('-'.repeat(rand)) + item.seq;
            aln.gene.push(obj);
            if(obj.seq.length > max) {
                max = obj.seq.length;
            }
        });
        aln.len = max;

        return aln;
    }

    isEqual(x, y) {
        let isEqual = true;
        _.forEach(x, (item, index) => {
            if(item.seq !== y[index].seq) {
                isEqual = false;
            }
        });
        return isEqual;
    }

    crossover(x, y) {

    }

    gapInsertion(x, y) {

    }

}

module.exports = Gene;