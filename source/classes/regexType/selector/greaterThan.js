'use strict';

const KeyValueRegexType = require('../prototype').KeyValueRegexType;

const GREATER = require('./constants').GREATER;
const GREATER_THAN = require('./constants').GREATER_THAN;
const GREATER_THAN_KEY = require('./constants').GREATER_THAN_KEY;
const GREATER_THAN_VALUES = require('./constants').GREATER_THAN_VALUES;

const _distinctions = {
    match: 'greaterThan',
    noMatch: 'greaterThanEqual'
};

class GreaterThanType extends KeyValueRegexType {
    constructor() {
        super('GREATER_THAN', GREATER, GREATER_THAN, _distinctions, GREATER_THAN_KEY, GREATER_THAN_VALUES);
    }
    getValuesMatches(source) {
        return Number(super.getValuesMatches(source));
    }
    getPrimitive(source) {
        return  { [this.getDistinction(source)]: {  [this.getKeyMatch(source)] : this.getValuesMatches(source) } };
    }
}

module.exports = GreaterThanType;