/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 58);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(5)(function(){
  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
});

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(28)
  , defined = __webpack_require__(10);
module.exports = function(it){
  return IObject(defined(it));
};

/***/ }),
/* 3 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function(it, key){
  return hasOwnProperty.call(it, key);
};

/***/ }),
/* 4 */
/***/ (function(module, exports) {

var core = module.exports = {version: '2.4.0'};
if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = function(exec){
  try {
    return !!exec();
  } catch(e){
    return true;
  }
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var dP         = __webpack_require__(8)
  , createDesc = __webpack_require__(12);
module.exports = __webpack_require__(1) ? function(object, key, value){
  return dP.f(object, key, createDesc(1, value));
} : function(object, key, value){
  object[key] = value;
  return object;
};

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = function(it){
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var anObject       = __webpack_require__(9)
  , IE8_DOM_DEFINE = __webpack_require__(27)
  , toPrimitive    = __webpack_require__(20)
  , dP             = Object.defineProperty;

exports.f = __webpack_require__(1) ? Object.defineProperty : function defineProperty(O, P, Attributes){
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if(IE8_DOM_DEFINE)try {
    return dP(O, P, Attributes);
  } catch(e){ /* empty */ }
  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
  if('value' in Attributes)O[P] = Attributes.value;
  return O;
};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(7);
module.exports = function(it){
  if(!isObject(it))throw TypeError(it + ' is not an object!');
  return it;
};

/***/ }),
/* 10 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function(it){
  if(it == undefined)throw TypeError("Can't call method on  " + it);
  return it;
};

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys       = __webpack_require__(30)
  , enumBugKeys = __webpack_require__(16);

module.exports = Object.keys || function keys(O){
  return $keys(O, enumBugKeys);
};

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = function(bitmap, value){
  return {
    enumerable  : !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable    : !(bitmap & 4),
    value       : value
  };
};

/***/ }),
/* 13 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil  = Math.ceil
  , floor = Math.floor;
module.exports = function(it){
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

/***/ }),
/* 14 */
/***/ (function(module, exports) {

var id = 0
  , px = Math.random();
module.exports = function(key){
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

var store      = __webpack_require__(19)('wks')
  , uid        = __webpack_require__(14)
  , Symbol     = __webpack_require__(0).Symbol
  , USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function(name){
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;

/***/ }),
/* 16 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');

/***/ }),
/* 17 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(19)('keys')
  , uid    = __webpack_require__(14);
module.exports = function(key){
  return shared[key] || (shared[key] = uid(key));
};

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(0)
  , SHARED = '__core-js_shared__'
  , store  = global[SHARED] || (global[SHARED] = {});
module.exports = function(key){
  return store[key] || (store[key] = {});
};

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(7);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function(it, S){
  if(!isObject(it))return it;
  var fn, val;
  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  throw TypeError("Can't convert object to primitive value");
};

/***/ }),
/* 21 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function() {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		var result = [];
		for(var i = 0; i < this.length; i++) {
			var item = this[i];
			if(item[2]) {
				result.push("@media " + item[2] + "{" + item[1] + "}");
			} else {
				result.push(item[1]);
			}
		}
		return result.join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};


/***/ }),
/* 22 */
/***/ (function(module, exports) {

// this module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  scopeId,
  cssModules
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  // inject cssModules
  if (cssModules) {
    var computed = Object.create(options.computed || null)
    Object.keys(cssModules).forEach(function (key) {
      var module = cssModules[key]
      computed[key] = function () { return module }
    })
    options.computed = computed
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/

var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

var listToStyles = __webpack_require__(44)

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

module.exports = function (parentId, list, _isProduction) {
  isProduction = _isProduction

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[data-vue-ssr-id~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),
/* 24 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function(it){
  return toString.call(it).slice(8, -1);
};

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(7)
  , document = __webpack_require__(0).document
  // in old IE typeof document.createElement is 'object'
  , is = isObject(document) && isObject(document.createElement);
module.exports = function(it){
  return is ? document.createElement(it) : {};
};

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

var global    = __webpack_require__(0)
  , core      = __webpack_require__(4)
  , ctx       = __webpack_require__(35)
  , hide      = __webpack_require__(6)
  , PROTOTYPE = 'prototype';

var $export = function(type, name, source){
  var IS_FORCED = type & $export.F
    , IS_GLOBAL = type & $export.G
    , IS_STATIC = type & $export.S
    , IS_PROTO  = type & $export.P
    , IS_BIND   = type & $export.B
    , IS_WRAP   = type & $export.W
    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
    , expProto  = exports[PROTOTYPE]
    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
    , key, own, out;
  if(IS_GLOBAL)source = name;
  for(key in source){
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if(own && key in exports)continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function(C){
      var F = function(a, b, c){
        if(this instanceof C){
          switch(arguments.length){
            case 0: return new C;
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if(IS_PROTO){
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if(type & $export.R && expProto && !expProto[key])hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library` 
module.exports = $export;

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(1) && !__webpack_require__(5)(function(){
  return Object.defineProperty(__webpack_require__(25)('div'), 'a', {get: function(){ return 7; }}).a != 7;
});

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(24);
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
  return cof(it) == 'String' ? it.split('') : Object(it);
};

/***/ }),
/* 29 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

var has          = __webpack_require__(3)
  , toIObject    = __webpack_require__(2)
  , arrayIndexOf = __webpack_require__(34)(false)
  , IE_PROTO     = __webpack_require__(18)('IE_PROTO');

module.exports = function(object, names){
  var O      = toIObject(object)
    , i      = 0
    , result = []
    , key;
  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while(names.length > i)if(has(O, key = names[i++])){
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(32), __esModule: true };

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

var core  = __webpack_require__(4)
  , $JSON = core.JSON || (core.JSON = {stringify: JSON.stringify});
module.exports = function stringify(it){ // eslint-disable-line no-unused-vars
  return $JSON.stringify.apply($JSON, arguments);
};

/***/ }),
/* 33 */
/***/ (function(module, exports) {

module.exports = function(it){
  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
  return it;
};

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(2)
  , toLength  = __webpack_require__(40)
  , toIndex   = __webpack_require__(39);
module.exports = function(IS_INCLUDES){
  return function($this, el, fromIndex){
    var O      = toIObject($this)
      , length = toLength(O.length)
      , index  = toIndex(fromIndex, length)
      , value;
    // Array#includes uses SameValueZero equality algorithm
    if(IS_INCLUDES && el != el)while(length > index){
      value = O[index++];
      if(value != value)return true;
    // Array#toIndex ignores holes, Array#includes - not
    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
      if(O[index] === el)return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(33);
module.exports = function(fn, that, length){
  aFunction(fn);
  if(that === undefined)return fn;
  switch(length){
    case 1: return function(a){
      return fn.call(that, a);
    };
    case 2: return function(a, b){
      return fn.call(that, a, b);
    };
    case 3: return function(a, b, c){
      return fn.call(that, a, b, c);
    };
  }
  return function(/* ...args */){
    return fn.apply(that, arguments);
  };
};

/***/ }),
/* 36 */
/***/ (function(module, exports) {

module.exports = {};

/***/ }),
/* 37 */
/***/ (function(module, exports) {

module.exports = true;

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(8).f
  , has = __webpack_require__(3)
  , TAG = __webpack_require__(15)('toStringTag');

module.exports = function(it, tag, stat){
  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
};

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(13)
  , max       = Math.max
  , min       = Math.min;
module.exports = function(index, length){
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(13)
  , min       = Math.min;
module.exports = function(it){
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(10);
module.exports = function(it){
  return Object(defined(it));
};

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

var global         = __webpack_require__(0)
  , core           = __webpack_require__(4)
  , LIBRARY        = __webpack_require__(37)
  , wksExt         = __webpack_require__(43)
  , defineProperty = __webpack_require__(8).f;
module.exports = function(name){
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if(name.charAt(0) != '_' && !(name in $Symbol))defineProperty($Symbol, name, {value: wksExt.f(name)});
};

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(15);

/***/ }),
/* 44 */
/***/ (function(module, exports) {

/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
module.exports = function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ }),
/* 45 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof__);

var extend = {};
extend.extend = function (out) {
      out = out || {};

      for (var i = 1; i < arguments.length; i++) {
            if (!arguments[i]) {
                  continue;
            }

            for (var key in arguments[i]) {
                  if (arguments[i].hasOwnProperty(key)) {
                        out[key] = arguments[i][key];
                  }
            }
      }

      return out;
};

extend.deepExtend = function (out) {
      out = out || {};

      for (var i = 1; i < arguments.length; i++) {
            var obj = arguments[i];

            if (!obj) {
                  continue;
            }

            for (var key in obj) {
                  if (obj.hasOwnProperty(key)) {
                        if (__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof___default()(obj[key]) === 'object') {
                              out[key] = extend.deepExtend(out[key], obj[key]);
                        } else {
                              out[key] = obj[key];
                        }
                  }
            }
      }

      return out;
};

/* harmony default export */ __webpack_exports__["a"] = (extend);

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY        = __webpack_require__(37)
  , $export        = __webpack_require__(26)
  , redefine       = __webpack_require__(49)
  , hide           = __webpack_require__(6)
  , has            = __webpack_require__(3)
  , Iterators      = __webpack_require__(36)
  , $iterCreate    = __webpack_require__(72)
  , setToStringTag = __webpack_require__(38)
  , getPrototypeOf = __webpack_require__(80)
  , ITERATOR       = __webpack_require__(15)('iterator')
  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
  , FF_ITERATOR    = '@@iterator'
  , KEYS           = 'keys'
  , VALUES         = 'values';

var returnThis = function(){ return this; };

module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
  $iterCreate(Constructor, NAME, next);
  var getMethod = function(kind){
    if(!BUGGY && kind in proto)return proto[kind];
    switch(kind){
      case KEYS: return function keys(){ return new Constructor(this, kind); };
      case VALUES: return function values(){ return new Constructor(this, kind); };
    } return function entries(){ return new Constructor(this, kind); };
  };
  var TAG        = NAME + ' Iterator'
    , DEF_VALUES = DEFAULT == VALUES
    , VALUES_BUG = false
    , proto      = Base.prototype
    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
    , $default   = $native || getMethod(DEFAULT)
    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
    , methods, key, IteratorPrototype;
  // Fix native
  if($anyNative){
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
    if(IteratorPrototype !== Object.prototype){
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if(DEF_VALUES && $native && $native.name !== VALUES){
    VALUES_BUG = true;
    $default = function values(){ return $native.call(this); };
  }
  // Define iterator
  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG]  = returnThis;
  if(DEFAULT){
    methods = {
      values:  DEF_VALUES ? $default : getMethod(VALUES),
      keys:    IS_SET     ? $default : getMethod(KEYS),
      entries: $entries
    };
    if(FORCED)for(key in methods){
      if(!(key in proto))redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject    = __webpack_require__(9)
  , dPs         = __webpack_require__(77)
  , enumBugKeys = __webpack_require__(16)
  , IE_PROTO    = __webpack_require__(18)('IE_PROTO')
  , Empty       = function(){ /* empty */ }
  , PROTOTYPE   = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function(){
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(25)('iframe')
    , i      = enumBugKeys.length
    , lt     = '<'
    , gt     = '>'
    , iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(70).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties){
  var result;
  if(O !== null){
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty;
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys      = __webpack_require__(30)
  , hiddenKeys = __webpack_require__(16).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O){
  return $keys(O, hiddenKeys);
};

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(6);

/***/ }),
/* 50 */,
/* 51 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(100)

var Component = __webpack_require__(22)(
  /* script */
  __webpack_require__(54),
  /* template */
  __webpack_require__(96),
  /* scopeId */
  "data-v-273f1241",
  /* cssModules */
  null
)
Component.options.__file = "D:\\jcc\\tree-vue\\src\\components\\tree-xbcx\\xTree.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] xTree.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-273f1241", Component.options)
  } else {
    hotAPI.reload("data-v-273f1241", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 52 */,
/* 53 */,
/* 54 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_extend_js__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_utils_js__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__methods_js__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__xTreeItem_vue__ = __webpack_require__(95);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__xTreeItem_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__xTreeItem_vue__);







/* harmony default export */ __webpack_exports__["default"] = ({
    name: "x-tree",
    components: {
        xTreeItem: __WEBPACK_IMPORTED_MODULE_3__xTreeItem_vue___default.a
    },
    props: {
        data: Array,
        options: Object,
        fn: Object
    },
    data: function data() {
        this.exportFn();
        this.opts = this.initOptions(this.options);
        this.tree = this.fn._arrayToTree(this.data, this.opts);
        this.tree = this.initTree(this.tree, this.opts);
        this.tree.fn = this.fn;
        this.tree.opts = this.opts;
        return {
            tree: this.tree,
            opts: this.opts,
            fnfn: this.fn
        };
    },
    computed: {},
    methods: {
        initOptions: function initOptions(options) {
            var opts = __WEBPACK_IMPORTED_MODULE_2__methods_js__["a" /* default */]._initOptions(options);
            return opts;
        },
        initTree: function initTree(tree, options) {
            var treeChecked = options.sel_ids ? __WEBPACK_IMPORTED_MODULE_2__methods_js__["a" /* default */]._checkTreeByIds(tree, options.sel_ids) : tree;
            var treeExpand = options.expandIds ? __WEBPACK_IMPORTED_MODULE_2__methods_js__["a" /* default */]._expandTreeByIds(treeChecked, options.expandIds) : treeChecked;

            if (options.expandIds) {
                var ids = __WEBPACK_IMPORTED_MODULE_1__utils_utils_js__["a" /* default */].toArray(options.expandIds);
                var items = __WEBPACK_IMPORTED_MODULE_2__methods_js__["a" /* default */].getItemByIds(tree, ids);
                for (var i = 0; i < items.length; i++) {
                    this.activeItem(items[i]);
                }
            }
            return treeExpand;
        },
        exportFn: function exportFn() {
            __WEBPACK_IMPORTED_MODULE_0__utils_extend_js__["a" /* default */].extend(this.fn, __WEBPACK_IMPORTED_MODULE_2__methods_js__["a" /* default */]);
            this.fn.getItemById = this.getItemById;
            this.fn.locateItem = this.locateItem;
            this.fn.locateItems = this.locateItems;
            this.fn.activeItem = this.activeItem;
            this.fn.clearActive = this.clearActive;
            this.fn.setCustom = this.setCustom;
        },
        getItemById: function getItemById(id) {
            var item = __WEBPACK_IMPORTED_MODULE_2__methods_js__["a" /* default */].getItemById(this.tree, id);
            if (!item) {
                console.warn('没有找到对应的item');
                return;
            }
            return item;
        },
        activeItem: function activeItem(item) {
            item.class = this.opts.class.active;
            this.tree.active.push(item);
        },
        clearActive: function clearActive(type, id) {
            var array = this.tree.active;
            if (type) {
                for (var index = 0; index < array.length; index++) {
                    array[index].class = '';
                }
                array.length = 0;
            } else {
                for (var _index = 0; _index < array.length; _index++) {
                    if (array[_index].id == id) {
                        array[_index].class = '';
                        array.splice();
                        break;
                    }
                }
            }
            return;
        },
        locateItem: function locateItem(id) {
            var item = __WEBPACK_IMPORTED_MODULE_2__methods_js__["a" /* default */].getItemById(this.tree, id);
            if (!item) {
                console.warn('没有找到对应的item');
                return;
            }
            item.expand = true;
            __WEBPACK_IMPORTED_MODULE_2__methods_js__["a" /* default */]._expandParent(item.parent, true);
            this.activeItem(item);
            return item;
        },
        locateItems: function locateItems(ids) {
            var tree = __WEBPACK_IMPORTED_MODULE_2__methods_js__["a" /* default */]._expandTreeByIds(this.tree, ids);
            return tree;
        },
        setCustom: function setCustom(id, custom) {
            var item = this.getItemById(id);
            if (item) {
                item.custom = custom;
            } else {
                console.warn('未找到item, 请检查id是否正确');
            }
            return item;
        }

    }
});

/***/ }),
/* 55 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });


/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'x-tree-item',
  props: {
    model: Object,
    options: Object,
    fn: Object,
    tree: Object
  },
  data: function data() {
    if (this.options.custom) {
      this.model.custom = this.options.custom(this.model);
    }
    return {
      showEditor: false,
      state: {}
    };
  },
  computed: {
    hasChildren: function hasChildren() {
      return this.model.is_node && this.model.children && this.model.children.length;
    },
    checkboxIcon: function checkboxIcon() {
      var faIcon = '';
      if (this.options.checkbox) {
        if (this.model.checkState === true) {
          faIcon = 'fa-check-square-o';
        } else if (this.model.checkState === false) {
          faIcon = 'fa-square-o';
        } else if (this.model.checkState === 'z') {
          faIcon = 'fa-minus-square-o';
        }
      }
      return faIcon;
    },
    cantEdit: function cantEdit() {
      return !this.model.is_edit && !this.model.is_delete && !this.model.is_add && !this.sortable.upAble && !this.sortable.downAble;
    },
    index: function index() {
      if (!this.model.parent) {
        return false;
      }
      return this.model.parent.children.indexOf(this.model);
    },
    sortable: function sortable() {
      if (!this.model.parent || this.model.parent.children.length == 1) {
        return {
          upAble: false,
          downAble: false
        };
      }
      var upable = true;
      var downable = true;
      var index = this.model.parent.children.indexOf(this.model);
      var len = this.model.parent.children.length;
      if (index === 0) {
        upable = false;
      } else if (index >= len - 1) {
        downable = false;
      }
      return {
        upAble: upable,
        downAble: downable
      };
    }
  },
  methods: {
    expandFn: function expandFn() {
      if (this.hasChildren) {
        this.model.expand = !this.model.expand;
        this.options.onExpand(this.model);
      }
    },
    checkFn: function checkFn() {
      this.fn._changeItem(this.model, !this.model.is_check);
      this.options.onCheck(this.model);
    },
    nameFn: function nameFn() {
      this.options.onClick(this.model);
    },
    nameFnn: function nameFnn() {},
    showEditorFn: function showEditorFn() {
      this.showEditor = !this.showEditor;
    },
    hideEditorFn: function hideEditorFn() {
      this.showEditor = false;
    },
    editFn: function editFn() {
      this.options.onEdit(this.model, this.editFnn);
      this.showEditor = false;
    },
    editFnn: function editFnn(item, pid, result) {
      if (result && this.model.parent.id != pid) {
        var index = this.model.parent.children.indexOf(this.model);
        this.model.parent.children.splice(index, 1);
        var parent = this.fn.getItemById(this.tree, pid);
        if (!parent || !parent.is_node) {
          return 'error : 修改节点(change parent), 新的parent不合法(1、不存在 2、is_node为false 3、当前节点本身或其后代)';
        }
        parent.children.push(this.model);
      }
    },
    deleteFn: function deleteFn() {
      this.options.onDelete(this.model, this.deleteFnn);
      this.showEditor = false;
    },
    deleteFnn: function deleteFnn(item, result) {
      var index = this.model.parent.children.indexOf(this.model);
      if (result) {
        this.model.parent.children.splice(index, 1);
      }
    },
    addChildFn: function addChildFn() {
      var newChild = {
        id: '',
        name: '',
        nodeId: this.model.id,
        is_node: false,
        is_check: false,
        expand: false,
        level: this.model.level + 1,
        parent: this.model,
        children: []
      };
      this.options.onAddChild(newChild, this.addChildFnn);
      this.showEditor = false;
    },
    addChildFnn: function addChildFnn(item, result) {
      if (result) {
        item.parent.children.push(item);
      }
    },
    sortFn: function sortFn(type) {
      var index = this.model.parent.children.indexOf(this.model);
      var brother = void 0;
      if (type) {
        brother = this.model.parent.children[index - 1];
        this.options.onSort(this.model, brother, this.upFnn);
      } else {
        brother = this.model.parent.children[index + 1];
        this.options.onSort(this.model, brother, this.downFnn);
      }
      this.showEditor = false;
    },
    upFnn: function upFnn(item, result) {
      var index = this.model.parent.children.indexOf(this.model);
      if (result) {
        this.model.parent.children.splice(index, 1);
        this.model.parent.children.splice(index - 1, 0, this.model);
      }
    },
    downFnn: function downFnn(item, result) {
      var index = this.model.parent.children.indexOf(this.model);
      if (result) {
        this.model.parent.children.splice(index, 1);
        this.model.parent.children.splice(index + 1, 0, this.model);
      }
    }
  }
});

/***/ }),
/* 56 */,
/* 57 */,
/* 58 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__xTree_vue__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__xTree_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__xTree_vue__);


Vue.component("x-tree", __WEBPACK_IMPORTED_MODULE_0__xTree_vue___default.a);

/***/ }),
/* 59 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_extend_js__ = __webpack_require__(45);



function _initOptions(options) {
  var defOptions = {
    zIndex: 9,
    is_trigger: false,
    has_search: false,
    only_child: false,
    node_merge: false,
    is_multi: true,
    expand: false,
    expandIds: null,
    sel_ids: '',
    checkbox: false,
    editable: false,
    editorText: {
      edit: '修改部门',
      delete: '删除部门',
      add: '添加子部门',
      up: '上移',
      down: '下移',
      unable: '无法操作'
    },
    style: {
      tree: {
        width: null,
        maxHeight: 300
      },
      item: {},
      children: {},
      custom: {
        position: 'absolute',
        top: '0',
        left: '0'
      }
    },
    class: {
      tree: '',
      item: '',
      active: 'x-tree-item-active',
      children: '',
      custom: ''
    },
    onExpand: function onExpand() {},
    onClick: function onClick() {},
    onCheck: function onCheck() {},
    onEdit: function onEdit() {},
    onDelete: function onDelete() {},
    onAddChild: function onAddChild() {},
    onSort: function onSort() {}
  };
  if (options.style && options.style.tree && options.style.tree.width) {
    defOptions.style.custom.left = options.style.tree.width;
  }
  var opt = __WEBPACK_IMPORTED_MODULE_1__utils_extend_js__["a" /* default */].deepExtend({}, defOptions, options);
  opt.originOptions = options;
  return opt;
}

function _arrayToTree(arrayIn, opt) {
  var rootId = _getTreeRoot(arrayIn);
  var treeData = {
    id: rootId,
    name: 'ROOT',
    nodeId: null,
    is_node: true,
    is_check: false,
    children: [],
    parent: null,
    level: 0,
    expand: true,
    custom: null,
    active: [],
    options: opt,
    originData: arrayIn,
    itemAmount: arrayIn.length
  };
  treeData.children = _getSubTree(arrayIn, treeData, opt);
  return treeData;
}

function _getTreeRoot(arrayIn) {
  var rootId = [];
  var clone = JSON.parse(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify___default()(arrayIn));
  for (var i = 0, len = arrayIn.length; i < len; i++) {
    for (var j = i; j < len; j++) {
      if (arrayIn[i].id == arrayIn[j].nodeId) {
        clone[j] = null;
      }
      if (arrayIn[i].nodeId == arrayIn[j].id) {
        clone[i] = null;
      }
    }
  }

  for (var k = 0; k < clone.length; k++) {
    if (clone[k]) {
      rootId.push(clone[k].nodeId);
    }
  }
  rootId = _uniqueArray(rootId);

  if (rootId.length > 1) {
    console.log('warning: rootId不唯一', rootId);
  } else if (rootId.length <= 0) {
    console.log('warning: 没有rootId', rootId);
  }

  return rootId[0];
}

function _uniqueArray(arrayIn) {
  var ua = [];
  for (var i = 0; i < arrayIn.length; i++) {
    if (ua.indexOf(arrayIn[i]) == -1) {
      ua.push(arrayIn[i]);
    }
  }
  return ua;
}

function _getSubTree(arrayIn, parent, opt) {
  var result = [];
  var temp = {};
  for (var i = 0; i < arrayIn.length; i++) {
    if (arrayIn[i].nodeId == parent.id) {
      temp = __WEBPACK_IMPORTED_MODULE_1__utils_extend_js__["a" /* default */].extend({}, arrayIn[i]);
      temp.parent = parent;
      temp.custom = null;
      temp.class = null;
      temp.style = null;
      temp.level = parent.level + 1;
      if (opt.expandIds) {
        temp.expand = false;
      } else {
        temp.expand = expandLvl(opt.expand, temp);
      }
      temp.checkState = temp.is_check;
      if (temp.is_node) {
        temp.children = _getSubTree(arrayIn, temp, opt);
      } else {
        temp.children = [];
      }
      result.push(temp);
    }
  }
  return result;
}

function expandLvl(expand, temp) {
  if (expand === true) {
    return true;
  } else if (expand === false && temp.level <= 0) {
    return true;
  } else if (temp.level <= expand) {
    return true;
  }
  return false;
}

function _checkTreeByIds(tree, sel_ids) {
  var ids = [];
  if (sel_ids.constructor == String) {
    ids = sel_ids.split(',');
  } else if (sel_ids.constructor == Array) {
    ids = sel_ids;
  } else {
    console.warn('请检查 sel_ids 格式');
  }

  _traverseTree(tree, _checkTreeByIdsFn, ids);

  return tree;
}

function _checkTreeByIdsFn(item, ids) {
  if (!ids.length) {
    return {
      children: false,
      brother: false
    };
  }
  for (var i = 0; i < ids.length; i++) {
    if (item.id == ids[i]) {
      _changeItem(item, true);
      ids.splice(i, 1);
      break;
    }
  }
  return {
    children: ids.length,
    brother: ids.length
  };
}

function _expandTreeByIds(tree, expand_ids) {
  var ids = [];
  if (expand_ids.constructor == String) {
    ids = expand_ids.split(',');
  } else if (expand_ids.constructor == Array) {
    ids = expand_ids;
  } else {
    console.warn('请检查 expandIds 格式');
  }
  _traverseTree(tree, _expandTreeByIdsFn, ids);
  return tree;
}

function _expandTreeByIdsFn(item, ids) {
  if (!ids.length) {
    return {
      children: false,
      brother: false
    };
  }
  for (var i = 0; i < ids.length; i++) {
    if (item.id == ids[i]) {
      _expandParent(item.parent, true);
      ids.splice(i, 1);
      break;
    }
  }
  return {
    children: ids.length,
    brother: ids.length
  };
}

function _activeTreeByIds(tree, expand_ids) {
  var ids = [];
  if (expand_ids.constructor == String) {
    ids = expand_ids.split(',');
  } else if (expand_ids.constructor == Array) {
    ids = expand_ids;
  } else {
    console.warn('请检查 expandIds 格式');
  }
  _traverseTree(tree, _activeTreeByIdsFn, ids);
  return tree;
}

function _activeTreeByIdsFn(item, ids) {
  if (!ids.length) {
    return {
      children: false,
      brother: false
    };
  }
  for (var i = 0; i < ids.length; i++) {
    if (item.id == ids[i]) {
      _expandParent(item.parent, true);
      ids.splice(i, 1);
      break;
    }
  }
  return {
    children: ids.length,
    brother: ids.length
  };
}

function _traverseTree(tree, fn, input, output) {
  if (!tree) {
    return true;
  }
  var _continue = fn(tree, input, output);
  if (_continue.children && tree.children) {
    for (var i = 0; i < tree.children.length; i++) {
      var brother = _traverseTree(tree.children[i], fn, input, output);
      if (!brother) {
        break;
      }
    }
  }
  return _continue.brother;
}

function _changeItem(item, change) {
  if (!item) {
    return false;
  }
  item.is_check = change;
  item.checkState = change;
  if (item.children) {
    _changeChildren(item.children, change);
    _changeChildrenState(item.children, change);
  }
  if (item.parent) {
    _changeParent(item.parent, change);
    _changeParentState(item.parent, change);
  }
}

function _changeChildrenState(children, change) {
  if (!children) {
    return false;
  }
  for (var i = 0; i < children.length; i++) {
    children[i].checkState = change;
    if (children[i].children) {
      _changeChildrenState(children[i].children, change);
    }
  }
  return true;
}

function _changeChildren(children, change) {
  if (!children) {
    return false;
  }
  for (var i = 0; i < children.length; i++) {
    if (children[i].is_check !== change) {
      children[i].is_check = change;
      if (children[i].children) {
        _changeChildren(children[i].children, change);
      }
    }
  }
  return true;
}

function _changeParentState(parent, change) {
  if (!parent) {
    return false;
  }
  var old = parent.checkState;
  var len = parent.children.length;

  if (change === 'z') {
    parent.checkState = 'z';
  } else if (change === true) {
    var n = 0;
    for (var i = 0; i < len; i++) {
      if (parent.children[i].checkState === true) {
        n += 1;
      } else {
        parent.checkState = 'z';
        break;
      }
    }
    if (n === len) {
      parent.checkState = true;
    }
  } else if (change === false) {
    var m = 0;
    for (var j = 0; j < len; j++) {
      if (parent.children[j].checkState === false) {
        m += 1;
      } else {
        parent.checkState = 'z';
        break;
      }
    }
    if (m === len) {
      parent.checkState = false;
    }
  }

  if (parent.parent && parent.checkState !== old) {
    _changeParentState(parent.parent, parent.checkState);
  }
  return true;
}

function _changeParent(parent, change) {
  if (!parent || parent.is_check == change) {
    return false;
  }
  if (change) {
    for (var i = 0; i < parent.children.length; i++) {
      if (!parent.children[i].is_check) {
        return false;
      }
    }
  }
  parent.is_check = change;
  if (parent.parent) {
    _changeParent(parent.parent, change);
  }
  return true;
}

function _expandParent(parent, expand) {
  parent.expand = expand;
  if (parent.parent) {
    _expandParent(parent.parent, expand);
  }
  return true;
}

function getName(model) {
  var name = [];
  _traverseTree(model, getNameFn, name);
  return name;
}

function getNameFn(item, name) {
  if (item.is_check) {
    name.push(item.name);
  }
  return {
    children: true,
    brother: true
  };
}

function getItemById(tree, id) {
  if (!tree || id == undefined || id == null) {
    return false;
  }
  if (tree.id == id) {
    return tree;
  }
  if (tree.children && tree.children.length) {
    for (var i = 0; i < tree.children.length; i++) {
      var item = getItemById(tree.children[i], id);
      if (item) {
        return item;
      }
    }
  }
  return false;
}

function getItemByIds(tree, ids) {
  if (!tree || !ids || !ids.length) {
    return false;
  }
  var result = [];
  var result2 = [];
  for (var i = 0; i < ids.length; i++) {
    if (tree.id == ids[i]) {
      result.push(tree);
      ids.splice(i, 1);
    }
  }
  if (ids.length && tree.children && tree.children.length) {
    for (var _i = 0; _i < tree.children.length; _i++) {
      var _result = getItemByIds(tree.children[_i], ids);
      result = result.concat(_result);
      if (!ids.length) {
        break;
      }
    }
  }
  return result;
}

function getItem(tree, key, value) {
  if (!tree || !ids || !ids.length) {
    return false;
  }
  var result = [];
  var result2 = [];
  for (var i = 0; i < ids.length; i++) {
    if (tree.id == ids[i]) {
      result.push(tree);
      ids.splice(i, 1);
    }
  }
  if (ids.length && tree.children && tree.children.length) {
    for (var _i2 = 0; _i2 < tree.children.length; _i2++) {
      var _result2 = getItemByIds(tree.children[_i2], ids);
      result = result.concat(_result2);
      if (!ids.length) {
        break;
      }
    }
  }
  return result;
}

function changeItem(item, key, value, fn) {
  if (!item || !ids || !ids.length) {
    return false;
  }
  var result = [];
  var result2 = [];
  for (var i = 0; i < ids.length; i++) {
    if (item.id == ids[i]) {
      result.push(item);
      ids.splice(i, 1);
    }
  }
  if (ids.length && item.children && item.children.length) {
    for (var _i3 = 0; _i3 < item.children.length; _i3++) {
      var _result3 = getItemByIds(item.children[_i3], ids);
      result = result.concat(_result3);
      if (!ids.length) {
        break;
      }
    }
  }
  return result;
}

var fn = {
  _initOptions: _initOptions,

  _arrayToTree: _arrayToTree,
  _getTreeRoot: _getTreeRoot,
  _uniqueArray: _uniqueArray,
  _getSubTree: _getSubTree,

  _checkTreeByIds: _checkTreeByIds,
  _checkTreeByIdsFn: _checkTreeByIdsFn,

  _expandTreeByIds: _expandTreeByIds,
  _expandTreeByIdsFn: _expandTreeByIdsFn,
  _expandParent: _expandParent,

  _activeTreeByIds: _activeTreeByIds,
  _activeTreeByIdsFn: _activeTreeByIdsFn,

  _traverseTree: _traverseTree,

  _changeItem: _changeItem,
  _changeChildren: _changeChildren,
  _changeParent: _changeParent,

  getName: getName,
  getNameFn: getNameFn,
  getItemById: getItemById,
  getItemByIds: getItemByIds
};

/* harmony default export */ __webpack_exports__["a"] = (fn);

/***/ }),
/* 60 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var utils = {};
utils.toArray = function (params) {
  var array = [];
  if (params.constructor === String) {
    array = params.split(',');
  } else if (params.constructor === Array) {
    array = params;
  } else {
    console.warn('请检查 参数 格式');
  }
  return array;
};
utils._uniqueArray = function (arrayIn) {
  var ua = [];
  for (var i = 0; i < arrayIn.length; i++) {
    if (ua.indexOf(arrayIn[i]) === -1) {
      ua.push(arrayIn[i]);
    }
  }
  return ua;
};

/* harmony default export */ __webpack_exports__["a"] = (utils);

/***/ }),
/* 61 */,
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(66), __esModule: true };

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(67), __esModule: true };

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _iterator = __webpack_require__(63);

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = __webpack_require__(62);

var _symbol2 = _interopRequireDefault(_symbol);

var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};

/***/ }),
/* 65 */,
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(86);
__webpack_require__(84);
__webpack_require__(87);
__webpack_require__(88);
module.exports = __webpack_require__(4).Symbol;

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(85);
__webpack_require__(89);
module.exports = __webpack_require__(43).f('iterator');

/***/ }),
/* 68 */
/***/ (function(module, exports) {

module.exports = function(){ /* empty */ };

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(11)
  , gOPS    = __webpack_require__(29)
  , pIE     = __webpack_require__(17);
module.exports = function(it){
  var result     = getKeys(it)
    , getSymbols = gOPS.f;
  if(getSymbols){
    var symbols = getSymbols(it)
      , isEnum  = pIE.f
      , i       = 0
      , key;
    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))result.push(key);
  } return result;
};

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(0).document && document.documentElement;

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(24);
module.exports = Array.isArray || function isArray(arg){
  return cof(arg) == 'Array';
};

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create         = __webpack_require__(47)
  , descriptor     = __webpack_require__(12)
  , setToStringTag = __webpack_require__(38)
  , IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(6)(IteratorPrototype, __webpack_require__(15)('iterator'), function(){ return this; });

module.exports = function(Constructor, NAME, next){
  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
  setToStringTag(Constructor, NAME + ' Iterator');
};

/***/ }),
/* 73 */
/***/ (function(module, exports) {

module.exports = function(done, value){
  return {value: value, done: !!done};
};

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

var getKeys   = __webpack_require__(11)
  , toIObject = __webpack_require__(2);
module.exports = function(object, el){
  var O      = toIObject(object)
    , keys   = getKeys(O)
    , length = keys.length
    , index  = 0
    , key;
  while(length > index)if(O[key = keys[index++]] === el)return key;
};

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

var META     = __webpack_require__(14)('meta')
  , isObject = __webpack_require__(7)
  , has      = __webpack_require__(3)
  , setDesc  = __webpack_require__(8).f
  , id       = 0;
var isExtensible = Object.isExtensible || function(){
  return true;
};
var FREEZE = !__webpack_require__(5)(function(){
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function(it){
  setDesc(it, META, {value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  }});
};
var fastKey = function(it, create){
  // return primitive with prefix
  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if(!has(it, META)){
    // can't set metadata to uncaught frozen object
    if(!isExtensible(it))return 'F';
    // not necessary to add metadata
    if(!create)return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function(it, create){
  if(!has(it, META)){
    // can't set metadata to uncaught frozen object
    if(!isExtensible(it))return true;
    // not necessary to add metadata
    if(!create)return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function(it){
  if(FREEZE && meta.NEED && isExtensible(it) && !has(it, META))setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY:      META,
  NEED:     false,
  fastKey:  fastKey,
  getWeak:  getWeak,
  onFreeze: onFreeze
};

/***/ }),
/* 76 */,
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

var dP       = __webpack_require__(8)
  , anObject = __webpack_require__(9)
  , getKeys  = __webpack_require__(11);

module.exports = __webpack_require__(1) ? Object.defineProperties : function defineProperties(O, Properties){
  anObject(O);
  var keys   = getKeys(Properties)
    , length = keys.length
    , i = 0
    , P;
  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
  return O;
};

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

var pIE            = __webpack_require__(17)
  , createDesc     = __webpack_require__(12)
  , toIObject      = __webpack_require__(2)
  , toPrimitive    = __webpack_require__(20)
  , has            = __webpack_require__(3)
  , IE8_DOM_DEFINE = __webpack_require__(27)
  , gOPD           = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(1) ? gOPD : function getOwnPropertyDescriptor(O, P){
  O = toIObject(O);
  P = toPrimitive(P, true);
  if(IE8_DOM_DEFINE)try {
    return gOPD(O, P);
  } catch(e){ /* empty */ }
  if(has(O, P))return createDesc(!pIE.f.call(O, P), O[P]);
};

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(2)
  , gOPN      = __webpack_require__(48).f
  , toString  = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function(it){
  try {
    return gOPN(it);
  } catch(e){
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it){
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has         = __webpack_require__(3)
  , toObject    = __webpack_require__(41)
  , IE_PROTO    = __webpack_require__(18)('IE_PROTO')
  , ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function(O){
  O = toObject(O);
  if(has(O, IE_PROTO))return O[IE_PROTO];
  if(typeof O.constructor == 'function' && O instanceof O.constructor){
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(13)
  , defined   = __webpack_require__(10);
// true  -> String#at
// false -> String#codePointAt
module.exports = function(TO_STRING){
  return function(that, pos){
    var s = String(defined(that))
      , i = toInteger(pos)
      , l = s.length
      , a, b;
    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(68)
  , step             = __webpack_require__(73)
  , Iterators        = __webpack_require__(36)
  , toIObject        = __webpack_require__(2);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(46)(Array, 'Array', function(iterated, kind){
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , kind  = this._k
    , index = this._i++;
  if(!O || index >= O.length){
    this._t = undefined;
    return step(1);
  }
  if(kind == 'keys'  )return step(0, index);
  if(kind == 'values')return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');

/***/ }),
/* 83 */,
/* 84 */
/***/ (function(module, exports) {



/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at  = __webpack_require__(81)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(46)(String, 'String', function(iterated){
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , index = this._i
    , point;
  if(index >= O.length)return {value: undefined, done: true};
  point = $at(O, index);
  this._i += point.length;
  return {value: point, done: false};
});

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global         = __webpack_require__(0)
  , has            = __webpack_require__(3)
  , DESCRIPTORS    = __webpack_require__(1)
  , $export        = __webpack_require__(26)
  , redefine       = __webpack_require__(49)
  , META           = __webpack_require__(75).KEY
  , $fails         = __webpack_require__(5)
  , shared         = __webpack_require__(19)
  , setToStringTag = __webpack_require__(38)
  , uid            = __webpack_require__(14)
  , wks            = __webpack_require__(15)
  , wksExt         = __webpack_require__(43)
  , wksDefine      = __webpack_require__(42)
  , keyOf          = __webpack_require__(74)
  , enumKeys       = __webpack_require__(69)
  , isArray        = __webpack_require__(71)
  , anObject       = __webpack_require__(9)
  , toIObject      = __webpack_require__(2)
  , toPrimitive    = __webpack_require__(20)
  , createDesc     = __webpack_require__(12)
  , _create        = __webpack_require__(47)
  , gOPNExt        = __webpack_require__(79)
  , $GOPD          = __webpack_require__(78)
  , $DP            = __webpack_require__(8)
  , $keys          = __webpack_require__(11)
  , gOPD           = $GOPD.f
  , dP             = $DP.f
  , gOPN           = gOPNExt.f
  , $Symbol        = global.Symbol
  , $JSON          = global.JSON
  , _stringify     = $JSON && $JSON.stringify
  , PROTOTYPE      = 'prototype'
  , HIDDEN         = wks('_hidden')
  , TO_PRIMITIVE   = wks('toPrimitive')
  , isEnum         = {}.propertyIsEnumerable
  , SymbolRegistry = shared('symbol-registry')
  , AllSymbols     = shared('symbols')
  , OPSymbols      = shared('op-symbols')
  , ObjectProto    = Object[PROTOTYPE]
  , USE_NATIVE     = typeof $Symbol == 'function'
  , QObject        = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function(){
  return _create(dP({}, 'a', {
    get: function(){ return dP(this, 'a', {value: 7}).a; }
  })).a != 7;
}) ? function(it, key, D){
  var protoDesc = gOPD(ObjectProto, key);
  if(protoDesc)delete ObjectProto[key];
  dP(it, key, D);
  if(protoDesc && it !== ObjectProto)dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function(tag){
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function(it){
  return typeof it == 'symbol';
} : function(it){
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D){
  if(it === ObjectProto)$defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if(has(AllSymbols, key)){
    if(!D.enumerable){
      if(!has(it, HIDDEN))dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
      D = _create(D, {enumerable: createDesc(0, false)});
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P){
  anObject(it);
  var keys = enumKeys(P = toIObject(P))
    , i    = 0
    , l = keys.length
    , key;
  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P){
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key){
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if(this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
  it  = toIObject(it);
  key = toPrimitive(key, true);
  if(it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return;
  var D = gOPD(it, key);
  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it){
  var names  = gOPN(toIObject(it))
    , result = []
    , i      = 0
    , key;
  while(names.length > i){
    if(!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META)result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
  var IS_OP  = it === ObjectProto
    , names  = gOPN(IS_OP ? OPSymbols : toIObject(it))
    , result = []
    , i      = 0
    , key;
  while(names.length > i){
    if(has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true))result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if(!USE_NATIVE){
  $Symbol = function Symbol(){
    if(this instanceof $Symbol)throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function(value){
      if(this === ObjectProto)$set.call(OPSymbols, value);
      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if(DESCRIPTORS && setter)setSymbolDesc(ObjectProto, tag, {configurable: true, set: $set});
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString(){
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f   = $defineProperty;
  __webpack_require__(48).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(17).f  = $propertyIsEnumerable;
  __webpack_require__(29).f = $getOwnPropertySymbols;

  if(DESCRIPTORS && !__webpack_require__(37)){
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function(name){
    return wrap(wks(name));
  }
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, {Symbol: $Symbol});

for(var symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), i = 0; symbols.length > i; )wks(symbols[i++]);

for(var symbols = $keys(wks.store), i = 0; symbols.length > i; )wksDefine(symbols[i++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function(key){
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(key){
    if(isSymbol(key))return keyOf(SymbolRegistry, key);
    throw TypeError(key + ' is not a symbol!');
  },
  useSetter: function(){ setter = true; },
  useSimple: function(){ setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function(){
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it){
    if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
    var args = [it]
      , i    = 1
      , replacer, $replacer;
    while(arguments.length > i)args.push(arguments[i++]);
    replacer = args[1];
    if(typeof replacer == 'function')$replacer = replacer;
    if($replacer || !isArray(replacer))replacer = function(key, value){
      if($replacer)value = $replacer.call(this, key, value);
      if(!isSymbol(value))return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(6)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(42)('asyncIterator');

/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(42)('observable');

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(82);
var global        = __webpack_require__(0)
  , hide          = __webpack_require__(6)
  , Iterators     = __webpack_require__(36)
  , TO_STRING_TAG = __webpack_require__(15)('toStringTag');

for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
  var NAME       = collections[i]
    , Collection = global[NAME]
    , proto      = Collection && Collection.prototype;
  if(proto && !proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(21)();
// imports


// module
exports.push([module.i, "\n.x-tree-wrapper[data-v-273f1241] {\n    position: relative;\n    cursor: pointer;\n    font-size: 1em;\n    line-height: 1.8em;\n    white-space: nowrap;\n}\n", ""]);

// exports


/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(21)();
// imports


// module
exports.push([module.i, "\n.x-tree-item[data-v-3db19918] {\n  position: relative;\n  font-size: 14px;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n}\n.x-tree-item-self[data-v-3db19918] {\n  position: relative;\n  padding: 0 2em 0 0.5em;\n}\n.x-tree-item-self[data-v-3db19918]:hover {\n  background: #E9EBEE;\n}\n.fa[data-v-3db19918] {\n  font-size: 14px;\n  width: 14px;\n  color: #999;\n}\n.icon-blank[data-v-3db19918] {\n  display: inline-block;\n  font-size: 14px;\n  width: 1em;\n}\n.x-tree-item-expand[data-v-3db19918] {\n}\n.x-tree-item-checkbox[data-v-3db19918] {\n}\n.x-tree-item-name[data-v-3db19918] {\n  display: inline-block;\n  vertical-align: bottom;\n  padding: 0 1em 0 0em;\n  width: calc(100% - 40px);\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.x-tree-item-name-tip[data-v-3db19918] {\n  position: absolute;\n  top: -20px;\n  left: 0px;\n  display: inline-block;\n  padding: 0 15px;\n  border: 1px solid #fff;\n  background: #fff;\n}\n.x-tree-item-edit[data-v-3db19918] {\n  display: none;\n  position: absolute;\n  top: 0.36em;\n  right: 0.27em;\n}\n.x-tree-item-self:hover .x-tree-item-edit[data-v-3db19918] {\n  display: block;\n}\n.x-tree-item-editor[data-v-3db19918] {\n  display: block;\n  position: absolute;\n  right: 0;\n  width: 120px;\n  z-index: 99;\n  box-shadow: 0 1px 4px #999;\n  background: #fff;\n}\n.x-tree-item-editor-item[data-v-3db19918] {\n  display: block;\n  padding: 2px 35px 2px 15px;\n}\n.x-tree-item-editor-item[data-v-3db19918]:hover {\n  background: #E9EBEE;\n}\n.x-tree-item-children[data-v-3db19918] {\n  /*padding-left: 1.3em;*/\n}\n.editable_false[data-v-3db19918] {\n  padding-right: 0;\n}\n.x-tree-node>.editable_false>.x-tree-item-name[data-v-3db19918] {\n  padding: 0;\n  width: calc(100% - 37px);\n}\n.x-tree-leaf>.editable_false>.x-tree-item-name[data-v-3db19918] {\n  padding: 0;\n  width: calc(100% - 20px);\n}\n\n", ""]);

// exports


/***/ }),
/* 92 */,
/* 93 */,
/* 94 */,
/* 95 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(101)

var Component = __webpack_require__(22)(
  /* script */
  __webpack_require__(55),
  /* template */
  __webpack_require__(97),
  /* scopeId */
  "data-v-3db19918",
  /* cssModules */
  null
)
Component.options.__file = "D:\\jcc\\tree-vue\\src\\components\\tree-xbcx\\xTreeItem.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] xTreeItem.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-3db19918", Component.options)
  } else {
    hotAPI.reload("data-v-3db19918", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "x-tree-wrapper"
  }, [_c('x-tree-item', {
    staticClass: "x-tree-root",
    attrs: {
      "model": _vm.tree,
      "tree": _vm.tree,
      "options": _vm.opts,
      "fn": _vm.fnfn
    },
    on: {
      "click": function($event) {
        $event.stopPropagation();
      }
    }
  })], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-273f1241", module.exports)
  }
}

/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "x-tree-item",
    class: _vm.model.is_node ? 'x-tree-node' : 'x-tree-leaf'
  }, [_c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.model.level),
      expression: "model.level"
    }],
    staticClass: "x-tree-item-self",
    class: [_vm.options.editable ? '' : 'editable_false', _vm.model.class],
    style: ([{
      'padding-left': (_vm.model.level - 1) * 1.3 + 0.8 + 'em'
    }, _vm.options.style.item, _vm.model.style]),
    on: {
      "mouseleave": _vm.hideEditorFn
    }
  }, [(_vm.hasChildren) ? _c('i', {
    staticClass: "x-tree-item-expand fa",
    class: _vm.model.expand ? 'fa-caret-down' : 'fa-caret-right',
    on: {
      "click": function($event) {
        $event.stopPropagation();
        _vm.expandFn($event)
      }
    }
  }) : _c('span', {
    staticClass: "icon-blank"
  }), _vm._v(" "), _c('i', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.options.checkbox),
      expression: "options.checkbox"
    }],
    staticClass: "x-tree-item-checkbox fa",
    class: _vm.checkboxIcon,
    on: {
      "click": function($event) {
        $event.stopPropagation();
        _vm.checkFn($event)
      }
    }
  }), _vm._v(" "), _c('i', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.model.is_node),
      expression: "model.is_node"
    }],
    staticClass: "x-tree-item-folder fa fa-folder-o"
  }), _vm._v(" "), _c('span', {
    staticClass: "x-tree-item-name",
    attrs: {
      "title": _vm.model.name
    },
    on: {
      "click": function($event) {
        $event.stopPropagation();
        _vm.nameFn($event)
      }
    }
  }, [_vm._v("\n      " + _vm._s(_vm.model.name) + "\n    ")]), _vm._v(" "), (_vm.options.editable) ? _c('i', {
    staticClass: "x-tree-item-edit fa fa-caret-square-o-down",
    on: {
      "click": function($event) {
        $event.stopPropagation();
        _vm.showEditorFn($event)
      }
    }
  }) : _vm._e(), _vm._v(" "), (_vm.options.editable) ? _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.showEditor),
      expression: "showEditor"
    }],
    staticClass: "x-tree-item-editor"
  }, [_c('span', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.model.is_edit),
      expression: "model.is_edit"
    }],
    staticClass: "x-tree-item-editor-item",
    on: {
      "click": function($event) {
        $event.stopPropagation();
        _vm.editFn($event)
      }
    }
  }, [_vm._v(_vm._s(_vm.options.editorText.edit))]), _vm._v(" "), _c('span', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.model.is_delete),
      expression: "model.is_delete"
    }],
    staticClass: "x-tree-item-editor-item",
    on: {
      "click": function($event) {
        $event.stopPropagation();
        _vm.deleteFn($event)
      }
    }
  }, [_vm._v(_vm._s(_vm.options.editorText.delete))]), _vm._v(" "), _c('span', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.model.is_add),
      expression: "model.is_add"
    }],
    staticClass: "x-tree-item-editor-item",
    on: {
      "click": function($event) {
        $event.stopPropagation();
        _vm.addChildFn($event)
      }
    }
  }, [_vm._v(_vm._s(_vm.options.editorText.add))]), _vm._v(" "), _c('span', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.sortable.upAble),
      expression: "sortable.upAble"
    }],
    staticClass: "x-tree-item-editor-item",
    on: {
      "click": function($event) {
        $event.stopPropagation();
        _vm.sortFn(true)
      }
    }
  }, [_vm._v(_vm._s(_vm.options.editorText.up))]), _vm._v(" "), _c('span', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.sortable.downAble),
      expression: "sortable.downAble"
    }],
    staticClass: "x-tree-item-editor-item",
    on: {
      "click": function($event) {
        $event.stopPropagation();
        _vm.sortFn(false)
      }
    }
  }, [_vm._v(_vm._s(_vm.options.editorText.down))]), _vm._v(" "), _c('span', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.cantEdit),
      expression: "cantEdit"
    }],
    staticClass: "x-tree-item-editor-item"
  }, [_vm._v("editorText.unable")])]) : _vm._e(), _vm._v(" "), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.model.level),
      expression: "model.level"
    }],
    staticClass: "x-tree-item-custom",
    style: (_vm.options.style.custom),
    domProps: {
      "innerHTML": _vm._s(_vm.model.custom)
    }
  })]), _vm._v(" "), (_vm.hasChildren) ? _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.model.expand),
      expression: "model.expand"
    }],
    staticClass: "x-tree-item-children",
    style: (_vm.options.style.children)
  }, _vm._l((_vm.model.children), function(model) {
    return _c('x-tree-item', {
      attrs: {
        "model": model,
        "tree": _vm.tree,
        "options": _vm.options,
        "fn": _vm.fn
      }
    })
  })) : _vm._e()])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-3db19918", module.exports)
  }
}

/***/ }),
/* 98 */,
/* 99 */,
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(90);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(23)("2c58ae52", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-273f1241\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./xTree.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-273f1241\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./xTree.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(91);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(23)("b25e849a", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-3db19918\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./xTreeItem.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-3db19918\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./xTreeItem.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ })
/******/ ]);