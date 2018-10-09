'use strict';

const Joi = require('joi');

const geometryKeys = require('./geometry');
const throwKeys = require('./resolution').throw;
const equalsKeys = require('./selector').equals;
const numericKeys = require('./selector').numeric;
const presenceKeys = require('./selector').presence;
const regexKeys = require('./selector').regex;
const featureKeys = require('./feature');

const mapcssKeys = [
    geometryKeys, throwKeys, 
    equalsKeys, numericKeys, 
    presenceKeys, regexKeys
].reduce((keys, k) => Object.assign(keys, k), {});

exports.geometry = Joi.object().keys(geometryKeys);
exports.throw = Joi.object().keys(throwKeys);
exports.equals = Joi.object().keys(equalsKeys);
exports.numeric = Joi.object().keys(numericKeys);
exports.presence = Joi.object().keys(presenceKeys);
exports.regex = Joi.object().keys(regexKeys);
exports.feature = Joi.object().keys(featureKeys);
exports.mapcss = Joi.object().keys(mapcssKeys);
