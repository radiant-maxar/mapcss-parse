var _createClass=function(){function a(a,b){for(var c,d=0;d<b.length;d++)c=b[d],c.enumerable=c.enumerable||!1,c.configurable=!0,'value'in c&&(c.writable=!0),Object.defineProperty(a,c.key,c)}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}(),_get=function a(b,c,d){null===b&&(b=Function.prototype);var e=Object.getOwnPropertyDescriptor(b,c);if(e===void 0){var f=Object.getPrototypeOf(b);return null===f?void 0:a(f,c,d)}if('value'in e)return e.value;var g=e.get;return void 0===g?void 0:g.call(d)};function _classCallCheck(a,b){if(!(a instanceof b))throw new TypeError('Cannot call a class as a function')}function _possibleConstructorReturn(a,b){if(!a)throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called');return b&&('object'==typeof b||'function'==typeof b)?b:a}function _inherits(a,b){if('function'!=typeof b&&null!==b)throw new TypeError('Super expression must either be null or a function, not '+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}var DistinctionRegexType=require('./distinctionRegexType'),KeyValueRegexType=function(a){function b(a,c,d,e,f,g){_classCallCheck(this,b);var h=_possibleConstructorReturn(this,(b.__proto__||Object.getPrototypeOf(b)).call(this,a,c,d,e));return h._keyRegex=f,h._valuesRegex=g,h}return _inherits(b,a),_createClass(b,[{key:'getMatches',value:function getMatches(a){return _get(b.prototype.__proto__||Object.getPrototypeOf(b.prototype),'getMatches',this).call(this,a)[0]}},{key:'getKeyMatch',value:function getKeyMatch(a){return a.match(this._keyRegex)[0]}},{key:'getValuesMatches',value:function getValuesMatches(a){return a.match(this._valuesRegex)[0]}},{key:'keyRegex',get:function get(){return this._keyRegex}},{key:'valuesRegex',get:function get(){return this._valuesRegex}}]),b}(DistinctionRegexType);module.exports=KeyValueRegexType;