'use strict';

const DistinctionRegexType = require('../prototype').DistinctionRegexType;
const PRESENCE = require('./constants').PRESENCE;
const PRESENCE_VALUES = require('./constants').PRESENCE_VALUES;
const POSITIVE_PRESENCE = require('./constants').POSITIVE_PRESENCE;

const _distinctions = {
    match: 'presence',
    noMatch: 'absence'
};

class PresenceType extends DistinctionRegexType {
    constructor() {
        super('PRESENCE', PRESENCE, POSITIVE_PRESENCE, _distinctions);
        this._presenceValuesRegex = PRESENCE_VALUES;
    }
    getPresenceValues(source) {
        return source.match(this._presenceValuesRegex)[0];
    }
    getPrimitive(source) {
        return { [this.getDistinction(source)]: this.getPresenceValues(source) }; 
    }
}

module.exports = PresenceType;