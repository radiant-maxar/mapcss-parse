'use strict';

const regexTypes = require('../regexType')();

class Parser {
    constructor() {
        if (!Parser.instance) {
            this._types = Object.values(regexTypes);
            this._mainRegex = regexTypes['MAIN'].regex;
            Parser.instance = this;
        }
        return Parser.instance;
    }   

    getPrimitive(component) {
        try {
            return this.getType(component).getPrimitive(component);
        } catch (error) {
            throw new Error('provided source cannot be parsed into mapcss primitive');
        }
    }
    getPrimitives(source) {
        return this.getComponents(source).map((c, index, self) => this.getPrimitive(c));
    }
    getComponents(source) {
        return source.match(this._mainRegex);
    }
    getType(source) {
        const type = this._types.find(type => type.isMatch(source));
        if (type === undefined) {
            throw new Error('provided source does not have a matching RegexType');
        }
        return type;
    }
    parse(source) {
        try {
            const mapcssComponents = [];
            let mapcssComponent = {};
            this.getPrimitives(source).forEach((p, i, primitives) => {
                const hasResolution = Object.keys(mapcssComponent).findIndex(k => regexTypes['THROW'].regex.test(k)) > -1;
                if (hasResolution) {
                    mapcssComponents.push(mapcssComponent);
                    mapcssComponent = {};
                }
                
                const key = Object.keys(p)[0];
                if (['equals', 'notEquals'].indexOf(key) > -1) {
                    const current = mapcssComponent[key] || {};
                    const next = p[key];
                    p = { [key]: Object.assign(current, next) };
                }

                mapcssComponent = Object.assign(mapcssComponent, p);

                if (i === primitives.length - 1) {
                    mapcssComponents.push(mapcssComponent);
                }
                
            });
            return mapcssComponents;
        } catch (error) {
            throw new Error(error);

        }
    }
}

/* SINGLETON! */
const instance = new Parser();
Object.freeze(instance);
module.exports = instance;
