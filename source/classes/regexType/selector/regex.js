'use strict';

const DistinctionRegexType = require('../prototype').DistinctionRegexType;

const REGEX = require('./constants').REGEX;
const POSITIVE_REGEX = require('./constants').POSITIVE_REGEX;
const REGEX_KEY = require('./constants').REGEX_KEY;
const REGEX_VALUES = require('./constants').REGEX_VALUES;

const _distinctions = {
    match: 'positiveRegex',
    noMatch: 'negativeRegex'
};

class RegexRegexType extends DistinctionRegexType {
    constructor() {
        super('REGEX', REGEX, POSITIVE_REGEX, _distinctions);
        this._REGEX_KEY = REGEX_KEY;
        this._REGEX_VALUES = REGEX_VALUES;
    }
    getMatches(source) {
        return super.getMatches(source)[0];
    }
    getRegexKey(source) {
        return source.match(this._REGEX_KEY)[0];
    }
    getRegexValues(source) {
        return source.match(this._REGEX_VALUES)[0].slice(1).split('|');
    }
    getPrimitive(source) {
        return { [this.getDistinction(source)]: { [this.getRegexKey(source)]: this.getRegexValues(source) } };
    }
}

module.exports = RegexRegexType;