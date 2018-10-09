'use strict';

const DistinctionTypeRegex = require('../prototype').DistinctionRegexType;
const EQUALS = require('./constants').EQUALS;
const EQUALS_VALUES = require('./constants').EQUALS_VALUES;
const EQUAL = require('./constants').EQUAL;
const tagsFromSource = require('../../../helpers').tagsFromSource;

const distinctions = {
    match: 'equals',
    noMatch: 'notEquals'
};

class EqualsType extends DistinctionTypeRegex {
    constructor() {
        super('EQUALS', EQUALS, EQUAL, distinctions);
        this._equalsValuesRegex = EQUALS_VALUES;
    }
    getDistinction(source) {
        return super.getDistinction(source);
    }
    getEqualsValues(source) {
        return tagsFromSource(source.match(this._equalsValuesRegex));
    }
    getPrimitive(source) { 
        return  { [this.getDistinction(source)]: this.getEqualsValues(source) };
    }
}

module.exports = EqualsType;