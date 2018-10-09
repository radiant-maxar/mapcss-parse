'use strict';

const RegexType = require('./regexType');  

class DistinctionRegexType extends RegexType {
    constructor(type, regex, distinctionRegex, distinctions) {
        super(type, regex);
        this._distinctionRegex = distinctionRegex;
        this._distinctions = distinctions;
    }
    getDistinction(source) {
        if (!this._regex.test(source)) throw new Error('source must match base regular expression');
        return this._distinctionRegex.test(source) ? this._distinctions.match : this._distinctions.noMatch;
    }
}

module.exports = DistinctionRegexType;