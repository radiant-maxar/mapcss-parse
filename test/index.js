'use strict';

const expect = require('chai').expect;
const Joi = require('joi');

const readFileSync = require('fs').readFileSync;
const mapcss = readFileSync('./testData/test.mapcss').toString();
const cumulative = readFileSync('./testData/cumulative.mapcss').toString();

const mapcssParse = require('../source');

const schemas = [
    require('../schema/primitives/resolution').throw,
    require('../schema/primitives/selector').equals,
    require('../schema/primitives/selector').numeric,
    require('../schema/primitives/selector').presence,
    require('../schema/primitives/selector').regex,
    require('../schema/primitives/geometry')
];

describe('mapcss-parse', () => {
    describe('parse', () => {
        it('executes the Parser class\'s parse method, turning mapcss into config objects', () => {
            mapcssParse.parse(mapcss).forEach(m => {
                const entries = Object.entries(m);
                const schemaComplaint = entries.filter(e => {
                    const composedEntry = { [e[0]] : e[1] };
                    return schemas.findIndex(s => {
                        const validation = Joi.validate(composedEntry, s);
                        return validation.value !== undefined && validation.error === null;
                    }) > -1;
                }).length === entries.length;
                expect(schemaComplaint).to.be.true;
            });
        });
        it('builds cumulative tag maps for equal types', () => {
            mapcssParse.parse(cumulative).forEach(m => {
                const equals = m.equals;
                expect(equals.building).to.eql('yes');
                expect(equals.healthcare).to.eql('clinic');
            });
        }); 
    });
});