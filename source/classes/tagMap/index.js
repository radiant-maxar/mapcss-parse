'use strict';

class TagMap {
    constructor() {
        if (!TagMap.instance) {
            TagMap.instance = this;
        }
        return this;
    }
    getTags(mapcssObject) {
        try { 
            return Object.keys(mapcssObject).reduce((expectedTags, key) => {
                let values;
                if(/regex/gi.test(key)) {
                    Object.keys(mapcssObject[key]).forEach((regexKey) => {
                        values = mapcssObject[key][regexKey].map((val) => val.replace(/\$|\^/g, ''));
                        if (expectedTags.hasOwnProperty(regexKey)) {
                            values = values.concat(expectedTags[regexKey]);
                        
                        }
                        expectedTags[regexKey] = values;
                    });
                } 
                if (/(greater|less)Than(Equal)?|equals|(pres|abs)ence/g.test(key)) {
                    const tagKey = /(pres|abs)ence/.test(key) ? mapcssObject[key] : Object.keys(mapcssObject[key])[0];
                    values = key === 'equals' ? [mapcssObject[key][tagKey]] : [];
                    if (expectedTags.hasOwnProperty(tagKey)) {
                        values = key === 'equals' ? values.concat(expectedTags[tagKey]) : [];
                    }
                    expectedTags[tagKey] = values;
                }
                return expectedTags;
            }, {});

        } catch (error) {
            throw new Error(error);

        }
    }
}

const instance = new TagMap();
Object.freeze(instance);
module.exports = instance;
