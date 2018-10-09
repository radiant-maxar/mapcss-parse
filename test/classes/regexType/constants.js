'use strict';

const expect = require('chai').expect;

const readFileSync = require('fs').readFileSync;
const mapcss = readFileSync('./testData/test.mapcss').toString();

const reverse = require('../../../source/helpers').reverse;

const GEOMETRY_GROUPS = require('../../../source/classes/regexType/geometry/constants').GEOMETRY_GROUPS;
const NODE = require('../../../source/classes/regexType/geometry/constants').NODE;
const WAY =  require('../../../source/classes/regexType/geometry/constants').WAY;
const CLOSEDWAY =  require('../../../source/classes/regexType/geometry/constants').CLOSEDWAY;
const GEOMS = [NODE, WAY, CLOSEDWAY];

const GREATER_THAN = require('../../../source/classes/regexType/selector/constants').GREATER_THAN;
const GREATER_THAN_EQUAL = require('../../../source/classes/regexType/selector/constants').GREATER_THAN_EQUAL;
const LESS_THAN = require('../../../source/classes/regexType/selector/constants').LESS_THAN;
const LESS_THAN_EQUAL = require('../../../source/classes/regexType/selector/constants').LESS_THAN_EQUAL;
const EQUAL = require('../../../source/classes/regexType/selector/constants').EQUAL;
const NOT_EQUAL = require('../../../source/classes/regexType/selector/constants').NOT_EQUAL;
const POSITIVE_REGEX = require('../../../source/classes/regexType/selector/constants').POSITIVE_REGEX;
const NEGATIVE_REGEX = require('../../../source/classes/regexType/selector/constants').NEGATIVE_REGEX;
const PRESENCE = require('../../../source/classes/regexType/selector/constants').PRESENCE;
const PRESENCE_VALUES = require('../../../source/classes/regexType/selector/constants').PRESENCE_VALUES;
const POSITIVE_PRESENCE = require('../../../source/classes/regexType/selector/constants').POSITIVE_PRESENCE;

const RESOLUTION = require('../../../source/classes/regexType/resolution/constants').RESOLUTION;
const THROW_ERROR = require('../../../source/classes/regexType/resolution/constants').THROW_ERROR;
const THROW_WARNING = require('../../../source/classes/regexType/resolution/constants').THROW_WARNING;

module.exports = () => {
    describe('geometry', () => {
        describe('NODE', () => {
            it('matches MapCSS representation of osm node type', () => {
                expect(NODE.test('node')).to.be.true;
                expect(NODE.test('way')).to.be.false;
            });
        });
        describe('WAY', () => {
            it('matches MapCSS representation of osm way type', () => {
                expect(WAY.test('way')).to.be.true;
                expect(WAY.test('node')).to.be.false;
            });
        });
        describe('CLOSEDWAY', () => {
            it('matches MapCSS representation of osm closedway type', () => {
                expect(CLOSEDWAY.test(':closedway')).to.be.true;
                expect(CLOSEDWAY.test('closedway')).to.be.false;
            });
        });
        describe('GEOMETRY', () => {
            it('matches osm geometry types', () => {
                mapcss.match(new RegExp(GEOMETRY_GROUPS,'g')).forEach(m => {
                    expect(GEOMS.findIndex((g) => g.test(m))).to.not.eql(-1);
                });  
            });
        });
    });
    describe('selector', () => {
        describe('GREATER_THAN', () => {
            it('only matches the \'greater than\' equality', () => {
                expect(GREATER_THAN.test('11 > 10')).to.be.true;
                expect(GREATER_THAN.test('11 >= 11')).to.be.false;
            });
        });
        describe('GREATER_THAN_EQUAL', () => {
            it('only matches the \'greater than or equal to\' equality', () => {
                expect(GREATER_THAN_EQUAL.test('11 >= 11')).to.be.true;
                expect(GREATER_THAN_EQUAL.test('11 > 10')).to.be.false;
            });
        });
        describe('LESS_THAN', () => {
            it('only matches the \'less than\' equality', () => {
                expect(LESS_THAN.test('10 < 11')).to.be.true;
                expect(LESS_THAN.test('11 <= 11')).to.be.false;
            });
        });
        describe('LESS_THAN_EQUAL', () => {
            it('only matches the \'less than\' equality', () => {
                expect(LESS_THAN_EQUAL.test('11 <= 11')).to.be.true;
                expect(LESS_THAN_EQUAL.test('10 < 11')).to.be.false;
            });
        });
        describe('EQUAL', () => {
            it('only matches an equal to equality', () => {
                expect(EQUAL.test(reverse('1 = 1'))).to.be.true;
                expect(EQUAL.test(reverse('1 != 0'))).to.be.false;
                expect(EQUAL.test(reverse('1 >= 0'))).to.be.false;
                expect(EQUAL.test(reverse('0 <= 1'))).to.be.false;
                expect(EQUAL.test(reverse('a != b'))).to.be.false;
                expect(EQUAL.test('=~/^osm$/')).to.be.false;
            });
        });
        describe('NOT EQUAL', () => {
            it('only matches a not equal to equality', () => {
                expect(NOT_EQUAL.test('a != b')).to.be.true;
                expect(NOT_EQUAL.test('a = b')).to.be.false;
            });
        });
        describe('POSITIVE_REGEX', () => {
            it('only matches positive regex leading characters', () => {
                expect(POSITIVE_REGEX.test('=~/osm/')).to.be.true;
                expect(POSITIVE_REGEX.test('!~/osm/')).to.be.false;
            });
        });
        describe('NEGATIVE_REGEX', () => {
            it('only matches negative regex leading characters', () => {
                expect(NEGATIVE_REGEX.test('!~/osm/')).to.be.true;
                expect(NEGATIVE_REGEX.test('=~/osm/')).to.be.false;
            });
        });
        describe('PRESENCE', () => {
            it('matches present/absent selector', () => {
                expect(PRESENCE.test('[a]')).to.be.true;
                expect(PRESENCE.test('[!a]')).to.be.true;
                expect(PRESENCE.test('[a = b]')).to.be.false;
            });
        });
        describe('PRESENCE_VALUES', () => {
            it('matches key name in both present/absent selector', () => {
                expect('[a]'.match(PRESENCE_VALUES)).to.eql(['a']);
                expect('[!a]'.match(PRESENCE_VALUES)).to.eql(['a']);
            });
        });
        describe('POSITIVE_PRESENCE', () => {
            it('matches only presence, and not absence, selector', () => {
                expect(POSITIVE_PRESENCE.test('[a]')).to.be.true;
                expect(POSITIVE_PRESENCE.test('[!a]')).to.be.false;
            });
        });
    });
    describe('resolution', () => {
        describe('RESOLUTION', () => {
            it('matches mapcss resolution', () => {
                mapcss.match(new RegExp(RESOLUTION, 'g')).forEach(r => {
                    const subResolution = /(error|warning)/i;
                    expect(subResolution.test(r)).to.be.true;
                });
            });
        });
        describe('THROW_ERROR', () => {
            it('matches warning resolution', () => {
                const error = 'throwError: "[amenity=school]: [amenity cannot be coupled with school]";';
                const warning = 'throwWarning: "[amenity=drinking_water][man_made=water_tap]: MapRules preset \'Water Tap\': must be coupled with name";';
                expect(THROW_ERROR.test(error)).to.be.true;
                expect(THROW_ERROR.test(warning)).to.be.false;
            });
        });
        describe('THROW_WARNING', () => {
            it('matches error resolution', () => {
                const error = 'throwError: "[amenity=school]: [amenity cannot be coupled with school]";';
                const warning = 'throwWarning: "[amenity=drinking_water][man_made=water_tap]: MapRules preset \'Water Tap\': must be coupled with name";';
                expect(THROW_WARNING.test(warning)).to.be.true;
                expect(THROW_WARNING.test(error)).to.be.false;
            });
        });
    });
};