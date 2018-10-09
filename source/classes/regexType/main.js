'use strict';

const RegexType = require('./prototype').RegexType;
const MAIN = require('./constants').MAIN;

class MainType extends RegexType {
    constructor () {
        super('MAIN', MAIN);
    };
}

module.exports = MainType;