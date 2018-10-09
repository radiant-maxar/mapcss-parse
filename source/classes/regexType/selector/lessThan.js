'use strict';

const KeyValueRegexType = require('../prototype').KeyValueRegexType;

const LESS = require('./constants').LESS;
const LESS_THAN = require('./constants').LESS_THAN;
const LESS_THAN_KEY = require('./constants').LESS_THAN_KEY;
const LESS_THAN_VALUES = require('./constants').LESS_THAN_VALUES;

const _distinctions = {
    match: 'lessThan',
    noMatch: 'lessThanEqual'
};

class LessThanType extends KeyValueRegexType {
    constructor() {
        super('LESS_THAN', LESS, LESS_THAN, _distinctions, LESS_THAN_KEY, LESS_THAN_VALUES);
    }
    getValuesMatches(source) {
        return Number(super.getValuesMatches(source));
    }
    getPrimitive(source) {
        return { [this.getDistinction(source)]: {  [this.getKeyMatch(source)] : this.getValuesMatches(source) } };
    }
}

module.exports = LessThanType;