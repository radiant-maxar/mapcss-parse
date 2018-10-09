'use strict';

/* --- GEOMETRY --- */

const _NODE = 'node';
const _WAY = 'way';
const _CLOSEDWAY = ':closed';
const _CLOSEDWAY_FULL = 'closedway';

exports.NODE = new RegExp(_NODE);
exports.WAY = new RegExp(_WAY);
exports.CLOSEDWAY = new RegExp(_CLOSEDWAY);
exports.CLOSEDWAY_FULL = new RegExp(_CLOSEDWAY_FULL);

exports.GEOMETRY_GROUPS = `${_NODE}|${_WAY}|${_CLOSEDWAY}`;

exports.GEOMETRY = new RegExp(`^${_NODE}$|^${_WAY}$|^${_CLOSEDWAY}$`, 'i');
exports.GEOMETRY_SCHEMA = new RegExp(`^${_NODE}$|^${_WAY}$|^${_CLOSEDWAY_FULL}$`, 'i');