'use strict';

const Joi = require('joi');
const GEOMETRY = new RegExp(require('../../source/classes/regexType/geometry/constants').GEOMETRY);

module.exports = {
    geometry: Joi.array().items(Joi.string().regex(GEOMETRY)),
    tags: Joi.object()
};
