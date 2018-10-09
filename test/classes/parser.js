'use strict';

const expect = require('chai').expect;
const Joi = require('joi');

const readFileSync = require('fs').readFileSync;
const mapcss = readFileSync('./testData/test.mapcss').toString();
const Parser = require('../../source/classes/parser');
const RegexType = require('../../source/classes/regexType/prototype').RegexType;

const schemas = [
    require('../../schema/primitives/resolution').throw,
    require('../../schema/primitives/selector').equals,
    require('../../schema/primitives/selector').numeric,
    require('../../schema/primitives/selector').presence,
    require('../../schema/primitives/selector').regex,
    require('../../schema/primitives/geometry')
];

module.exports = () => {
    describe('Parser', () => {
        describe('getComponents', () => {
            it('finds and returns mapcss string components', () => {
                Parser.getComponents(mapcss).forEach(c => {
                    expect(Parser.getType(c)).instanceOf(RegexType);
                });

            });
        });
        describe('getType', () => {
            it('throws if no regex type found', () => {
                expect(Parser.getType.bind(Parser, 'not mapcss')).to.throw(Error);
            });
        });
        describe('getPrimitive', () => {
            it('returns schema complaint primitive', () => {
                Parser.getComponents(mapcss).forEach(c => {
                    const primitive = Parser.getPrimitive(c);
                    const schemaCompliance = schemas.findIndex(s => {
                        return Joi.validate(primitive, s).value !== undefined;
                    });
                    expect(schemaCompliance).to.be.greaterThan(-1);
                });
            });
            it('throws if component not found', () => {
                expect(Parser.getPrimitive.bind(Parser, 'not mapcss')).to.throw(Error);
            });
        });
        describe('getPrimitives', () => {
            it('returns list of schmea compliant primitives', () => {
                const primitives = Parser.getPrimitives(mapcss);
                const schemaCompliance = primitives.filter((p) => {
                    return schemas.findIndex(s => {
                        return Joi.validate(p , s).value !== undefined;
                    }) > -1;
                }).length === primitives.length;
                expect(schemaCompliance).to.be.true;
            });
        });
        describe('parse', () => {
            it('parses mapcss file into list of mapcss objects', () => {
                Parser.parse(mapcss).forEach(m => {
                    const entries = Object.entries(m);
                    const schemaComplaint = entries.filter(e => {
                        const composedEntry = { [e[0]] : e[1] };
                        const match = schemas.findIndex(s => {
                            const validation = Joi.validate(composedEntry, s);
                            return validation.value !== undefined && validation.error === null;
                        }) > -1;
                        if (match===false) console.log(composedEntry);
                        return match;
                    }).length === entries.length;
                    expect(schemaComplaint).to.be.true;
                });
            });
        });
        it('throws if provided mapcss string is invalid', () => {
            expect(() => Parser.parse('not mapcss')).to.throw(Error);
        });
    });
};