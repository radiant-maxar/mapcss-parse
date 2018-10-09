'use strict';

const GeometryType = require('./geometry');
const ThrowType = require('./resolution').Throw;
const EqualsType = require('./selector').Equals;
const GreaterThanType = require('./selector').GreaterThan;
const LessThanType = require('./selector').LessThan;
const PresenceType = require('./selector').Presence;
const RegexType = require('./selector').Regex;
const MainType = require('./main');

const geometryType = new GeometryType();
const throwType = new ThrowType();
const equalsType = new EqualsType();
const greaterThanType = new GreaterThanType();
const lessThanType = new LessThanType();
const presenceType = new PresenceType();
const regexType = new RegexType();
const mainType = new MainType();

let instance = null;

const _getTypes = () => { 
    return {
        [geometryType.type] : geometryType,
        [throwType.type] : throwType,
        [equalsType.type] : equalsType,
        [greaterThanType.type] : greaterThanType,
        [lessThanType.type]: lessThanType,
        [presenceType.type]: presenceType,
        [regexType.type]: regexType,
        [mainType.type]: mainType
    };
};

module.exports = () => {
    if (instance === null) {
        instance = _getTypes();
    }
    return instance;
};