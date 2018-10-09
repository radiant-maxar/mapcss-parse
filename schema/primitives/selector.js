'use strict';

const Joi = require('joi');

/**
 * { 
 *    "building" : "yes",
 *    "amenity": "healthcare"
 * }
 */
exports.equals = { equals: Joi.object(), notEquals: Joi.object() };

/**
 * {
 *   "height": {
 *     "greaterThan": 10,
 *     "lessThanEqual": 20
 *   }
 * } 
 * */
const innerNumeric =  Joi.object().pattern(/(.*?)/, Joi.number());
exports.numeric = {
    greaterThan: innerNumeric,
    greaterThanEqual: innerNumeric,
    lessThan: innerNumeric,
    lessThanEqual: innerNumeric
};

/**
 * { "presence": "building" }
 * ...or
 * { "absence": "building" }
 */
exports.presence = { presence: Joi.string(), absence: Joi.string() };

/**
 * { "positive": { "building": ["yes", "house"] } }
 * ...or
 * { "negative": { "building": ["yes", "house"] } }
 */

const innerRegex = Joi.object().pattern(/(.*?)/g, Joi.array().items(Joi.string()));
exports.regex = { positiveRegex: innerRegex, negativeRegex: innerRegex };
