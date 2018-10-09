'use strict';

const DistinctionRegexType = require('./distinctionRegexType');

class KeyValueRegexType extends DistinctionRegexType {
    constructor(type, regex, distinctionRegex, distinctions, keyRegex, valuesRegex) {
        super(type, regex, distinctionRegex, distinctions);
        this._keyRegex = keyRegex;
        this._valuesRegex = valuesRegex;
    }
    get keyRegex() {
        return this._keyRegex;
    }
    get valuesRegex() {
        return this._valuesRegex;
    }
    getMatches(source) {
        return super.getMatches(source)[0];
    }
    getKeyMatch(source) {
        return source.match(this._keyRegex)[0];
    }
    getValuesMatches(source) {
        return source.match(this._valuesRegex)[0];
    }
}

module.exports = KeyValueRegexType;