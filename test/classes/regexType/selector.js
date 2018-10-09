'use strict';

const expect = require('chai').expect;
const Joi = require('joi');

const RegexType = require('../../../source/classes/regexType/prototype').RegexType;

const regexTypes = require('../../../source/classes/regexType')();

const eT = regexTypes['EQUALS'];
const gT = regexTypes['GREATER_THAN'];
const lT = regexTypes['LESS_THAN'];
const pT = regexTypes['PRESENCE'];
const rrT = regexTypes['REGEX'];

const EqualsSchema = require('../../../schema/primitives').equals;
const NumericSchema = require('../../../schema/primitives').numeric;
const PresenceSchema = require('../../../schema/primitives').presence;
const RegexSchema = require('../../../schema/primitives').regex;

module.exports = () => {
    describe('EqualsType', () => {
        it('inherits from RegexType', () => {
            expect(eT).instanceOf(RegexType);
        });
        describe('isMatch', () => {
            it('matches equals symbol', () => {
                expect(eT.isMatch('[surfing = great]')).to.be.true;
                expect(eT.isMatch('[surfing=great]')).to.be.true;
                expect(eT.isMatch('[surfing != great]')).to.be.true;
            });
        });
        describe('getEqualsValues', () => {
            it('gets equals sign symbol', () => {
                expect(eT.getEqualsValues('[surfing = great]')).to.eql({ surfing: 'great' });
            });
        });
        describe('getPrimitive', () => {
            it('gets schema compliant primitive', () => {
                ['[surfing = great]', '[surfing != great]'].forEach(s => {
                    const prim = eT.getPrimitive(s);
                    const validation = Joi.validate(prim, EqualsSchema);
                    expect(validation.value).to.eql(prim);
                });
            });
        });
    });
    describe('GreaterThanType', () => {
        it('inherits from KeyValueRegexType', () => () => {
            expect(gT).instanceOf(RegexType);
        });
        describe('isMatch', () => {
            it('matches greater than symbol', () => {
                expect(gT.isMatch('[height > 5]')).to.be.true;
                expect(gT.isMatch('[height >= 5]')).to.be.true;
            });
        });
        describe('getDistinction', () => {
            it('gets _distinction.match when provide \'>', () => {
                expect(gT.getDistinction('[height > 10]')).to.eql('greaterThan');
            });
            it('gets _distinction.noMatch when provided \'>=\'', () => {
                expect(gT.getDistinction('[height >= 10]')).to.eql('greaterThanEqual');
            });
            it('throws when provided does not match _regex', () => {
                expect(gT.getDistinction.bind(gT, '[height <= 20]')).to.throw;
            });
        });
        describe('getKeyMatch', () => {
            it('gets key matches in provided string', () => {
                expect(gT.getKeyMatch('[height > 10]')).to.eql('height');
                expect(gT.getKeyMatch('[height >= 10]')).to.eql('height');
            });
        });
        describe('getValuesMatches', () => {
            it('gets numeric values matches in provided', () => {
                expect(gT.getValuesMatches('[height > 10]')).to.eql(10);
                expect(gT.getValuesMatches('[height >= 10]')).to.eql(10);
            });
        });
        describe('getPrimitive', () => {
            it('returns schema complaint primitive', () => {
                ['[height > 10]', '[height >= 10]'].forEach(s => {
                    const prim = gT.getPrimitive(s);
                    const validation = Joi.validate(prim, NumericSchema);
                    expect(validation.value).to.eql(prim);
                });
            });
        });
    });
    describe('LessThanType', () => {
        it('inherits from KeyValueRegexType', () => {
            expect(lT).instanceof(RegexType);
        });
        describe('isMatch', () => {
            it('matches less than symbol', () => {
                expect(lT.isMatch('[height < 10]')).to.be.true;
                expect(lT.isMatch('[height <= 10]')).to.be.true;
            });
        });
        describe('getDistinction', () => {
            it('gets _distinction.match when provide \'<', () => {
                expect(lT.getDistinction('[height < 10]')).to.eql('lessThan');
            });
            it('gets _distinction.noMatch when provided \'<=\'', () => {
                expect(lT.getDistinction('[height <= 10]')).to.eql('lessThanEqual');
            });
            it('throws when provided does not match _regex', () => {
                expect(lT.getDistinction.bind(lT, '[height >= 20]')).to.throw;
            });
        });
        describe('getKeyMatch', () => {
            it('gets key matches in provided string', () => {
                expect(lT.getKeyMatch('[height < 10]')).to.eql('height');
                expect(lT.getKeyMatch('[height <= 10]')).to.eql('height');
            });
        });
        describe('getValuesMatches', () => {
            it('gets numeric values matches in provided', () => {
                expect(lT.getValuesMatches('[height < 10]')).to.eql(10);
                expect(lT.getValuesMatches('[height <= 10]')).to.eql(10);
            });
        });
        describe('getPrimitive', () => {
            it('returns schema compliant primitive', () => {
                ['[height < 10]', '[height <= 10]'].forEach(s => {
                    const prim = lT.getPrimitive(s);
                    const validation = Joi.validate(prim, NumericSchema);
                    expect(validation.value).to.eql(prim);
                });
            });
        });
    });
    describe('PresenceType', () => {
        it('inherits from DistinctionRegexType', () => {
            expect(pT).instanceof(RegexType);
        });
        describe('isMatch', () => {
            it('matches presence selectors', () => {
                expect(pT.isMatch('[amenity]')).to.be.true;
                expect(pT.isMatch('[!amenity]')).to.be.true;
            });
        });
        describe('getMatches', () => {
            it('gets key in presence selector', () => {
                expect(pT.getPresenceValues('[amenity]')).to.eql('amenity');
                expect(pT.getPresenceValues('[!amenity]')).to.eql('amenity');
            });
        });
        describe('getDistinction', () => {
            it('gets _distinctions.match when provided presence selector', () => {
                expect(pT.getDistinction('[amenity]')).to.eql('presence');
            });
            it('gets _distinctions.noMatch when provided absence selector', () => {
                expect(pT.getDistinction('[!amenity]')).to.eql('absence');
            });
        });
        describe('getPrimitive', () => {
            ['[amenity]', '[!amenity]'].forEach(s => {
                const prim = pT.getPrimitive(s);
                const validation = Joi.validate(prim, PresenceSchema);
                expect(validation.value).to.eql(prim);
            });
        });
    });
    describe('RegexRegexType', () => {
        it('inherits from DistinctionRegexType', () => {
            expect(rrT).instanceOf(RegexType);
        });
        describe('isMatch', () => {
            it('matches selectors with positive/negative regex characters', () => {
                expect(rrT.isMatch('[amenity=~/yes|school/]')).to.be.true;
                expect(rrT.isMatch('[amenity!~/yes|school/]')).to.be.true;
            });
        });
        describe('getMatches', () => {
            it('matches the positive/negative regex characters', () => {
                expect(rrT.getMatches('[amenity=~/yes|school/]')).to.eql('=~');
                expect(rrT.getMatches('[amenity!~/yes|school/]')).to.eql('!~');
            });
        });
        describe('getDistinctions', () => {
            it('gets _distinctions.match when provided a positive regex selector', () => {
                expect(rrT.getDistinction('[amenity=~/yes|school/]')).to.eql('positiveRegex');
            });
            it('gets _distinctions.noMatch when provided a positive regex selector', () => {
                expect(rrT.getDistinction('[amenity!~/yes|school/]')).to.eql('negativeRegex');
            });
        });
        describe('getRegexValues', () => {
            it('matches regex values within regex selector', () => {
                expect(rrT.getRegexValues('[amenity=~/yes|school/]')).to.eql(['yes', 'school']);
                expect(rrT.getRegexValues('[amenity!~/yes|school/]')).to.eql(['yes', 'school']);
            });
        });
        describe('getPrimitive', () => {
            it('returns schema compliant primitive', () => {
                ['[amenity=~/yes|school/]', '[amenity!~/yes|school/]'].forEach(s => {
                    const prim = rrT.getPrimitive(s);
                    const validation = Joi.validate(prim, RegexSchema);
                    expect(validation.value).to.eql(prim);
                });
            });
        });
    });
};