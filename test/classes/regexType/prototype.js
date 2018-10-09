'use strict';

const expect = require('chai').expect;
const RegexType = require('../../../source/classes/regexType/prototype').RegexType;
const DistinctionRegexType = require('../../../source/classes/regexType/prototype').DistinctionRegexType;
const KeyValueRegexType = require('../../../source/classes/regexType/prototype').KeyValueRegexType;

module.exports = () => {
    describe('RegexType', () => {
        const rT = new RegexType('OSM', /osm/gi);
        it('has gettable regex and type properties', () => {
            expect(rT.regex).to.eql(/osm/gi);
            expect(rT.type).to.eql('OSM');
        });
        describe('isMatch', () => {
            it('tests if provided string matches regex property', () => {
            	expect(rT.isMatch('osm')).to.be.true;
            	expect(rT.isMatch('qgis')).to.be.false;
            });
        });
        describe('getMatches', () => {
            it('returns character groups in provided string matched by regex', () => {
            	expect(rT.getMatches('osm*osm*osm')).to.eql(['osm','osm','osm']);
        	});
        });
    });
    describe('DistinctionRegexType', () => {
        const dR = new DistinctionRegexType('A~B', /(A|B)/, /A/, { match: 'A', noMatch: 'B'});
        it('inherits from RegexType', () => {
            expect(DistinctionRegexType.prototype).instanceOf(RegexType);
            expect(dR.regex).to.eql(/(A|B)/);
            expect(dR.type).to.eql('A~B');
            expect(dR.isMatch('A')).to.be.true;
            expect(dR.isMatch('C')).to.be.false;
            expect(dR.getMatches('Aosm')[0]).to.eql('A');
        });
        describe('getDistinction', () => {
            it('returns _distinctions.match if provided string matched _distinctionRegex', () => {
                expect(dR.getDistinction('A')).to.eql('A');
            });
            it('returns _distinctions.noMatch if provided string matched _distinctionRegex', () => {
                expect(dR.getDistinction('B')).to.eql('B');
            });
            it('throws if provided string does not match _regex', () => {
                expect(dR.getDistinction.bind(dR, 'C')).to.throw;
            });
        });
    });
    describe('KeyValueRegexType', () => {
        const kV = new KeyValueRegexType(
            'a=b', /(=|!=)/g, /=/g, { match: '=', noMatch: '!='}, /a(?=[ \=])/g, /b(?=$)/g
        );
        it('inherits from DistinctionType', () => {
            expect(KeyValueRegexType.prototype).instanceOf(RegexType);
            expect(kV.regex).to.eql(/(=|!=)/g);
            expect(kV.type).to.eql('a=b');
            expect(kV.isMatch('=')).to.be.true;
            expect(kV.isMatch('C')).to.be.false;
            expect(kV.getMatches('a=b')).to.eql('=');
            expect(kV.getDistinction('a=b')).to.eql('=');
            expect(kV.getDistinction.bind(kV, 'c')).to.throw;
        });
        it('has gettable keyRegex', () => {
            expect(kV.keyRegex).to.eql(/a(?=[ \=])/g);
        });
        it('has gettable valuesRegex', () => {
            expect(kV.valuesRegex).to.eql(/b(?=$)/g);
        });
        describe('getKeyMatch', () => {
            it('returns match found in source by _keyRegex', () => {
                expect(kV.getKeyMatch('a=b')).to.eql('a');
            });
        });
        describe('getValuesMatches', () => {
            it('returns array of values matched by _valuesRegex', () => {
                expect(kV.getValuesMatches('a=b')).to.eql('b');
            });
        });
    });
};
