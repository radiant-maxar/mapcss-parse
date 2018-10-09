'use strict';

const Parser = require('./classes/parser');
const TagMap = require('./classes/tagMap');

exports.parse = (mapcss) => Parser.parse(mapcss);
exports.tagMap = (selector) => TagMap.getTags(selector);