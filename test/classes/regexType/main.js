'use strict';

const expect = require('chai').expect;
const readFileSync = require('fs').readFileSync;
const mapcss = readFileSync('./testData/test.mapcss').toString();

const MainType = require('../../../source/classes/regexType/main');
const RegexType = require('../../../source/classes/regexType/prototype').RegexType;

const RESOLUTION = require('../../../source/classes/regexType/resolution/constants').RESOLUTION;
const SELECTOR = require('../../../source/classes/regexType/selector/constants').SELECTOR;
const GEOMETRY = require('../../../source/classes/regexType/geometry/constants').GEOMETRY;


module.exports = () => {
    describe('MainType', () => {
        const mT = new MainType();
        it('inherits from RegexType', () => {
            expect(MainType.prototype).instanceOf(RegexType);
        });
        describe('getMatches', () => {
            it('returns capture groups matched in mapcss string', () => {
                const matchers = [GEOMETRY, RESOLUTION, SELECTOR];
                mT.getMatches(mapcss).forEach(match => {
                    expect(matchers.findIndex((m) => m.test(match))).to.be.greaterThan(-1);
                });
            });
        });
    });
};