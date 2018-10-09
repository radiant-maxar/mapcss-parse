'use strict';

/* --- RESOLUTION --- */

const _THROW_ERROR = 'error';
const _THROW_WARNING = 'warning';
const _THROW = `(${_THROW_ERROR}|${_THROW_WARNING})`;
const _RESOLUTION_MESSAGE = '(?<=(error|warning|add|changekey|deleteobject|alternative|match):)(.?)*';
const _RESOLUTION_GROUPS = '.*(throw(Error|Warning)|fix(Add|ChangeKey|DeleteObject)|suggestAlternative|assert(Match|NoMatch)).*';

exports.THROW_ERROR = new RegExp(_THROW_ERROR, 'i');
exports.THROW_WARNING = new RegExp(_THROW_WARNING, 'i');
exports.THROW = new RegExp(_THROW,'i');
exports.RESOLUTION_MESSAGE = new RegExp(_RESOLUTION_MESSAGE, 'gi');
exports.RESOLUTION = new RegExp(_RESOLUTION_GROUPS, 'i');
exports.RESOLUTION_GROUPS = _RESOLUTION_GROUPS;
