'use strict';

const expect = require('chai').expect;
const helpers = require('../source/helpers');

describe('helpers', () => {
    describe('reverse', () => {
        it('reverses strings', () => {
            expect(helpers.reverse('hello')).to.eql('olleh');
        });
    });
    describe('tagsFromSource', () => {
        it('builds tags object from list of key value pairs', () => {
            const tagsFromSource = helpers.tagsFromSource(['building', 'yes', 'amenity', 'school']);
            expect(tagsFromSource).to.eql({ building: 'yes', amenity: 'school' });
        });
    });
    describe('buildFeature', () => {
        it('builds feature object from list of feature components', () => {
            const feature = helpers.buildFeature(['node', 'building', 'yes']);
            expect(feature).to.eql({ geometry: 'node', tags: { building: 'yes' }});
        });
    });
    describe('noSpaces', () => {
        it('removes spaces from a string', () => {
            expect(helpers.noSpaces('whitespace killah')).to.eql('whitespacekillah');
        });
    });
    describe('geometryTypeFromSource', () => {
        it('builds osm geometry type from geometry found in mapcss string', () => {
            expect(helpers.geometryTypeFromSource(':closed')).to.eql('closedway');
            expect(helpers.geometryTypeFromSource('node')).to.eql('node');
            expect(helpers.geometryTypeFromSource('way')).to.eql('way');
        });
    });
});
