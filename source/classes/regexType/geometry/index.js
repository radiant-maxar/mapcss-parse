'use strict';

const RegexType = require('../prototype').RegexType;

const GEOMETRY = require('./constants').GEOMETRY;

const geometryTypeFromSource = require('../../../helpers').geometryTypeFromSource;

class GeometryType extends RegexType {
    constructor() {
        super('GEOMETRY', GEOMETRY);
    }
    getMatches(source) {
        return geometryTypeFromSource(super.getMatches(source)[0]);
    }
    getPrimitive(source) {
        return { geometry: this.getMatches(source) };
    }
}

module.exports = GeometryType;