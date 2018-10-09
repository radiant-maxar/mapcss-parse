'use strict';

/* --- SELECTOR --- */

/* match numeric equality, keys, and values inside selector */
const _LESS = '<=?(?=\\s*?\\d+)';
const _LESS_THAN = '<(?!=)(?=\\s*?\\d+)';
const _LESS_THAN_EQUAL = '<=\\s+?(?=\\d+)';
const _LESS_THAN_KEY = '([^\\[\\]\\>\\=\\s]+)(?=\\s*?<=?)';
const _LESS_THAN_VALUES = '(?<=<=?\\s*?)(\\d+)(?=])';

exports.LESS = new RegExp(_LESS);
exports.LESS_THAN = new RegExp(_LESS_THAN);
exports.LESS_THAN_EQUAL = new RegExp(_LESS_THAN_EQUAL);
exports.LESS_THAN_KEY = new RegExp(_LESS_THAN_KEY, 'g');
exports.LESS_THAN_VALUES = new RegExp(_LESS_THAN_VALUES, 'g');

const _GREATER = '\\s*?>=?\\s*?(?=\\d+)';
const _GREATER_THAN = '>(?!=)\\s+?(?=\\d+)';
const _GREATER_THAN_EQUAL = '>=\\s+?(?=\\d+)';
const _GREATER_THAN_KEY = '([^\\[\\]\\=\\>\\s]+)(?=\\s*?>)'; 
const _GREATER_THAN_VALUES = '(?<=>=?\\s*?)(\\d+)(?=])';

exports.GREATER_THAN = new RegExp(_GREATER_THAN);
exports.GREATER_THAN_EQUAL = new RegExp(_GREATER_THAN_EQUAL);
exports.GREATER_THAN_KEY = new RegExp(_GREATER_THAN_KEY, 'g');
exports.GREATER_THAN_VALUES = new RegExp(_GREATER_THAN_VALUES, 'g');
exports.GREATER = new RegExp(_GREATER);

/* match regular expression terms */
const _POSITIVE_REGEX = '=~';
const _NEGATIVE_REGEX = '!~';
const _REGEX = `${_POSITIVE_REGEX}|${_NEGATIVE_REGEX}`;
const _REGEX_KEY = '([^\[]+)(?=(\=|\!))';
const _REGEX_VALUES = '\/(.*?)(?=\/\])';
const _REGEX_COMPONENTS = `${_REGEX}|${_REGEX_KEY}|${_REGEX_VALUES}`;

exports.POSITIVE_REGEX = new RegExp(_POSITIVE_REGEX);
exports.NEGATIVE_REGEX = new RegExp(_NEGATIVE_REGEX);
exports.REGEX = new RegExp(_REGEX);
exports.REGEX_KEY = _REGEX_KEY;
exports.REGEX_VALUES = _REGEX_VALUES;
exports.REGEX_COMPONENTS = new RegExp(_REGEX_COMPONENTS);

/* match single  k/v expressions */
const _EQUAL = '(?<!(throw(Error|Warning)|fix(Add|ChangeKey|DeleteObject)|suggestAlternative|assert(Match|NoMatch)).*)=\\s?(?![!<>~\\d]+)';
const _NOT_EQUAL = '!=';
const _EQUALS = '((?<!(>|<))\\s*?!?=\\s*?(?![!<>~\\d]+))';
const _EQUALS_VALUES = '[^\\[\\]\\=\\s!]+';

exports.EQUAL = new RegExp(_EQUAL); 
exports.NOT_EQUAL = new RegExp(_NOT_EQUAL); 
exports.EQUALS = new RegExp(_EQUALS, 'i');
exports.EQUALS_VALUES = new RegExp(_EQUALS_VALUES, 'g')
; 
/* matches 'key not present' equivalent statement */
const _PRESENCE = '^\\[((?!(<|>|~|=|\\]|\\[|\!(?=\]))).)*\\]$';
const _POSITIVE_PRESENCE = '\\[([^\\[\\]\\=\\>\\<\\!]*)\\]';
const _PRESENCE_VALUES = '[^\\[\\]\\!]+';

exports.PRESENCE = new RegExp(_PRESENCE); 
exports.POSITIVE_PRESENCE = new RegExp(_POSITIVE_PRESENCE);
exports.PRESENCE_VALUES = new RegExp(_PRESENCE_VALUES, 'g');

const _SELECTOR_GROUPS = '\\[([^\\]]*)\\]';
exports.SELECTOR_GROUPS = _SELECTOR_GROUPS;
exports.SELECTOR = new RegExp(_SELECTOR_GROUPS);