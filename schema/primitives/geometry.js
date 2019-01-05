'use strict';

const Joi = require('joi');
const GEOMETRY_SCHEMA = new RegExp(require('../../source/classes/regexType/geometry/constants').GEOMETRY_SCHEMA);

module.exports = { geometry: Joi.array().items(Joi.string().regex(GEOMETRY_SCHEMA)) };
