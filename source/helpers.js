'use strict';

/**
 * Provided string, returns string in reverse
 * @param {string} string String to reverse
 * @return {string} reversed string
 */
exports.reverse = (string) => string.split('').reverse().join('');


const _tagsFromSource = (keyValues) => {
    const tags = {};
    for (let i = 0; i < keyValues.length; i += 2) {
        tags[keyValues[i]] = keyValues[i + 1];
    }
    return tags;
};
/**
 * Builds tags object from list of key value pairs
 * @param {array} keyValues Array of key value pairs
 * @return {object} tags object
 */
exports.tagsFromSource = (keyValues) => _tagsFromSource(keyValues);

/**
 * Provided string, returns feature
 * @param {string} source feature string
 * @return {object} feature object;
 */
exports.buildFeature = (featureComponents) => {
    const feature = {
        geometry: featureComponents.shift(),
        tags: _tagsFromSource(featureComponents)
    };
    return feature;
};

/**
 * Removes all white spaces
 * @param {string} string string with white spaces
 * @return string without white spaces
 */
exports.noSpaces = (string) => string.replace(/\s*/g,'');

const _geometryTypeFromSource = (geomType) => {
    return geomType === ':closed' ? 'closedway' : geomType;
};

/**
 * Builds OSM geometry type from geometry string matched in mapcss
 * @param {string} geomType matched geometry types in source string
 * @return {string} geometry type
 */
exports.geometryTypeFromSource = (geomType) => _geometryTypeFromSource(geomType);

