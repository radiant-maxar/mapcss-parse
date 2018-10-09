'use strict';

const GEOMETRY_GROUPS = require('./geometry/constants').GEOMETRY_GROUPS;
const SELECTOR_GROUPS = require('./selector/constants').SELECTOR_GROUPS;
const RESOLUTION_GROUPS = require('./resolution/constants').RESOLUTION_GROUPS;

/* MAIN REGEX */
exports.MAIN = new RegExp(`(${GEOMETRY_GROUPS})|${SELECTOR_GROUPS}|${RESOLUTION_GROUPS}`,'g');