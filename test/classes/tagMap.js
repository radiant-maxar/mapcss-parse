'use strict';

const expect = require('chai').expect;
const Joi = require('joi');

const TagMap = require('../../source/classes/tagMap');
const tagMapSchema = require('../../schema/tagMap');

module.exports = () => {
    describe('TagMap', () => {
        describe('getTags', () => {
            it('takes parsed MapCSS object and returns map of tags and nominal values', () => {
                const selector = {
                    'geometry':'node',
                    'equals':{'amenity':'marketplace'},
                    'positiveRegex': { 'marketplace:type': ['open', 'indoor', 'mall']},
                    'greaterThan': { 'width': 10, 'area': 300 },
                    'presence': 'opening_hours',
                    'absence':'name',
                    'warning':'throwWarning: "[amenity=marketplace]: MapRules preset \'Market\': must be coupled with name";'
                };
                const tagMap = TagMap.getTags(selector);
                const validation = Joi.validate(tagMap, tagMapSchema);
                expect(validation.value).to.eql(tagMap);
                expect(validation.error).to.be.null;
            });
        });
    });
};
