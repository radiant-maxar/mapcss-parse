'use strict';

const Joi = require('joi');

/**
 * { error: "throwError: \"[amenity=school]: [amenity cannot be coupled with school]\";" }
 * ..or
 * { warning: "throwWarning: \"[amenity=marketplace]: MapRules preset 'Market': must be coupled with name\";" }
 */
exports.throw = { error: Joi.string(), warning: Joi.string() };
