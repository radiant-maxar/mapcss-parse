'use strict';

const expect = require('chai').expect;
const Joi = require('joi');

const RegexType = require('../../../source/classes/regexType/prototype').RegexType;
const grt = require('../../../source/classes/regexType')()['GEOMETRY'];
const GeometrySchema = require('../../../schema/primitives').geometry;

module.exports = () => {
    describe('GeometryType', () => {
        it('inherits from RegexType', () => {
            expect(grt).instanceOf(RegexType);
        });
        describe('isMatch', () => {
            it('matches valid geometries', () => {
                expect(grt.isMatch('node')).to.be.true;
                expect(grt.isMatch('way')).to.be.true;
                expect(grt.isMatch(':closed')).to.be.true;
            });
        });
        describe('getMatches', () => {
            it('gets valid geometries', () => {
                expect(grt.getMatches('node')).to.eql('node');
                expect(grt.getMatches('way')).to.eql('way');
                expect(grt.getMatches(':closed')).to.eql('closedway');
            });
        });
        describe('getPrimitive', () => {
            it('gets schema valid primitive', () => {
                ['node', 'way', ':closed'].forEach(g => {
                    const prim = grt.getPrimitive(g);
                    const validation = Joi.validate(prim, GeometrySchema);
                    expect(validation.value).to.eql(prim);
                });
            });
        });
    });
};