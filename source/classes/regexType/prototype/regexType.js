'use strict';

class RegexType {
    constructor(type, regex) {
        this._regex = regex;
        this._type = type;
    }
    get regex() {
        return this._regex;
    }
    get type() {
        return this._type;
    }
    getMatches(string) {
        return string.match(this._regex);
    }
    isMatch(string) {
        return this._regex.test(string);
    }
    matchingTypes(match) {
        return this._type === match.type;
    }
}

module.exports = RegexType;