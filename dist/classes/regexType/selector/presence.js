var _createClass=function(){function a(a,b){for(var c,d=0;d<b.length;d++)c=b[d],c.enumerable=c.enumerable||!1,c.configurable=!0,'value'in c&&(c.writable=!0),Object.defineProperty(a,c.key,c)}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}();function _defineProperty(a,b,c){return b in a?Object.defineProperty(a,b,{value:c,enumerable:!0,configurable:!0,writable:!0}):a[b]=c,a}function _classCallCheck(a,b){if(!(a instanceof b))throw new TypeError('Cannot call a class as a function')}function _possibleConstructorReturn(a,b){if(!a)throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called');return b&&('object'==typeof b||'function'==typeof b)?b:a}function _inherits(a,b){if('function'!=typeof b&&null!==b)throw new TypeError('Super expression must either be null or a function, not '+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}var DistinctionRegexType=require('../prototype').DistinctionRegexType,PRESENCE=require('./constants').PRESENCE,PRESENCE_VALUES=require('./constants').PRESENCE_VALUES,POSITIVE_PRESENCE=require('./constants').POSITIVE_PRESENCE,_distinctions={match:'presence',noMatch:'absence'},PresenceType=function(a){function b(){_classCallCheck(this,b);var a=_possibleConstructorReturn(this,(b.__proto__||Object.getPrototypeOf(b)).call(this,'PRESENCE',PRESENCE,POSITIVE_PRESENCE,_distinctions));return a._presenceValuesRegex=PRESENCE_VALUES,a}return _inherits(b,a),_createClass(b,[{key:'getPresenceValues',value:function b(a){return a.match(this._presenceValuesRegex)[0]}},{key:'getPrimitive',value:function b(a){return _defineProperty({},this.getDistinction(a),this.getPresenceValues(a))}}]),b}(DistinctionRegexType);module.exports=PresenceType;