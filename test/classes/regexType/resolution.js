'use strict';

const expect = require('chai').expect;
const Joi = require('joi');

const RegexType = require('../../../source/classes/regexType/prototype').RegexType;
const tType = require('../../../source/classes/regexType')()['THROW'];
const ThrowSchema = require('../../../schema/primitives').throw;

module.exports = () => {
    describe('ThrowType', () => {
        const error = '    throwError: "[amenity=marketplace]: opening_hours must be \'24/7\',\'sunrise to sunset\'";';
        const warning = '    throwWarning: "[amenity=marketplace]: opening_hours may be \'24/7\',\'sunrise to sunset\'";';
        it('inherits from RegexType', () => {
            expect(tType).instanceOf(RegexType);
        });
        describe('isMatch', () => {
            it('matches resolution values', () => {
                expect(tType.isMatch(error)).to.be.true;
            });
            it('returns a list of _regex matches', () => {
                expect(tType.getMatches(warning)).to.eql('Warning');
            });
        });
        describe('getDistinction', () => {
            it('returns _distinction.match when provided error resolution', () => {
                expect(tType.getDistinction(error)).to.eql('error');
            });
            it('returns _distinction.noMatch when provided warning resolution', () => {
                expect(tType.getDistinction(warning)).to.eql('warning');
            });
        });
        describe('getResolutionMessage', () => {
            const errorMessage = '"[amenity=marketplace]: opening_hours must be \'24/7\',\'sunrise to sunset\'";';
            const warningMessage = '"[amenity=marketplace]: opening_hours may be \'24/7\',\'sunrise to sunset\'";';
            it('returns error message for error resolution', () => {
                expect(tType.getResolutionMessage(error)).to.eql(errorMessage);
                expect(tType.getResolutionMessage(warning)).to.eql(warningMessage);
            });
        });
        describe('getPrimitive', () => {
            it('returns schema compliant primitive', () => {
                [error, warning].forEach(m => {
                    const prim = tType.getPrimitive(m);
                    const validation = Joi.validate(prim, ThrowSchema);
                    expect(validation.value).to.eql(prim);
                });
            });
        });
    });
};