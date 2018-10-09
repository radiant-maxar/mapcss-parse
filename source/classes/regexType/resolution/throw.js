'use strict';

const DistinctionRegexType = require('../prototype').DistinctionRegexType;
const THROW = require('./constants').THROW;
const THROW_ERROR = require('./constants').THROW_ERROR;
const RESOLUTION_MESSAGE = require('./constants').RESOLUTION_MESSAGE;

const distinctions = {
    match: 'error',
    noMatch: 'warning'
};

class ThrowRegexType extends DistinctionRegexType  {
    constructor() {
        super('THROW', THROW, THROW_ERROR, distinctions);
        this._resolutionMessageRegex = RESOLUTION_MESSAGE;
    }
    getMatches(source) {
        return super.getMatches(source)[0];
    }
    getResolutionMessage(source) {
        return source.match(this._resolutionMessageRegex)[0].trim();
    }
    getPrimitive(source) {
        return { [this.getDistinction(source)] : source.replace(/(throw(Error|Warning):|;|")/ig,'').trim() };
    }
}

module.exports = ThrowRegexType;
