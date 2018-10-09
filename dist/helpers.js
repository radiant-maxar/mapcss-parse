exports.reverse=function(a){return a.split('').reverse().join('')};var _tagsFromSource=function(a){for(var b={},c=0;c<a.length;c+=2)b[a[c]]=a[c+1];return b};/**
 * Builds tags object from list of key value pairs
 * @param {array} keyValues Array of key value pairs
 * @return {object} tags object
 */exports.tagsFromSource=function(a){return _tagsFromSource(a)},exports.buildFeature=function(a){var b={geometry:a.shift(),tags:_tagsFromSource(a)};return b},exports.noSpaces=function(a){return a.replace(/\s*/g,'')};var _geometryTypeFromSource=function(a){return':closed'===a?'closedway':a};/**
 * Builds OSM geometry type from geometry string matched in mapcss
 * @param {string} geomType matched geometry types in source string
 * @return {string} geometry type
 */exports.geometryTypeFromSource=function(a){return _geometryTypeFromSource(a)};