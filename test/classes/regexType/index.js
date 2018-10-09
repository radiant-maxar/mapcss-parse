'use strict';

module.exports = () => {
    describe('constants', require('./constants'));
    describe('prototype', require('./prototype'));
    describe('selection', require('./selector'));
    describe('resolution', require('./resolution'));
    describe('geometry', require('./geometry'));
    describe('main', require('./main'));
};