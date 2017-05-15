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
/******/ 	return __webpack_require__(__webpack_require__.s = 20);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__getTag__ = __webpack_require__(1);


function isArray(value) {
  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__getTag__["a" /* default */])(value) === '[object Array]';
}

/* harmony default export */ __webpack_exports__["a"] = (isArray);

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function getTag(value) {
  return Object.prototype.toString.call(value);
}

/* harmony default export */ __webpack_exports__["a"] = (getTag);

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__getTag__ = __webpack_require__(1);


function isPlainObject(value) {
  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__getTag__["a" /* default */])(value) === '[object Object]';
}

/* harmony default export */ __webpack_exports__["a"] = (isPlainObject);

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__getTag__ = __webpack_require__(1);


function isString(value) {
  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__getTag__["a" /* default */])(value) === '[object String]';
}

/* harmony default export */ __webpack_exports__["a"] = (isString);

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__getTag__ = __webpack_require__(1);


function isUndefined(value) {
  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__getTag__["a" /* default */])(value) === '[object Undefined]';
}

/* harmony default export */ __webpack_exports__["a"] = (isUndefined);

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mergeBase__ = __webpack_require__(10);


function merge() {
  var target = arguments[0] || {};
  for (var i = 1; i < arguments.length; i++) {
    target = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__mergeBase__["a" /* default */])(target, arguments[i]);
  }
  return target;
}

/* harmony default export */ __webpack_exports__["a"] = (merge);

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mergeDeepBase__ = __webpack_require__(11);


function mergeDeep() {
  var target = arguments[0] || {};
  for (var i = 1; i < arguments.length; i++) {
    target = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__mergeDeepBase__["a" /* default */])(target, arguments[i]);
    console.log(target);
  }
  return target;
}

/* harmony default export */ __webpack_exports__["a"] = (mergeDeep);

/***/ }),
/* 7 */
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
/* 8 */
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
/* 9 */
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

var listToStyles = __webpack_require__(13)

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
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__isUndefined__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__isArray__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__isPlainObject__ = __webpack_require__(2);




var hasOwnProperty = Object.prototype.hasOwnProperty;

function mergeBase(target, src) {
  if (target === src) {
    return target;
  }
  var result = target;
  if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__isArray__["a" /* default */])(src)) {
    if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__isArray__["a" /* default */])(result)) {
      result = [];
    }
    for (var i = 0; i < src.length; i++) {
      if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__isUndefined__["a" /* default */])(src[i]) && result[i] !== src[i] && result !== src[i]) {
        result[i] = src[i];
      }
    }
    return result;
  }
  if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__isPlainObject__["a" /* default */])(src)) {
    if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__isPlainObject__["a" /* default */])(result)) {
      result = {};
    }
    for (var key in src) {
      if (hasOwnProperty.call(src, key) && !__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__isUndefined__["a" /* default */])(src[key]) && result[key] !== src[key] && result !== src[key]) {
        result[key] = src[key];
      }
    }
    return result;
  }
  if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__isUndefined__["a" /* default */])(src)) {
    result = src;
  }
  return result;
}

/* harmony default export */ __webpack_exports__["a"] = (mergeBase);

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__isUndefined__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__isArray__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__isPlainObject__ = __webpack_require__(2);




var hasOwnProperty = Object.prototype.hasOwnProperty;

function mergeDeepBase(target, src) {
  if (target === src) {
    return target;
  }
  var result = target;
  if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__isArray__["a" /* default */])(src)) {
    if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__isArray__["a" /* default */])(result)) {
      result = [];
    }
    for (var i = 0; i < src.length; i++) {
      if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__isUndefined__["a" /* default */])(src[i]) && result[i] !== src[i] && result !== src[i]) {
        result[i] = mergeDeepBase(result[i], src[i]);
      }
    }
    return result;
  }
  if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__isPlainObject__["a" /* default */])(src)) {
    if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__isPlainObject__["a" /* default */])(result)) {
      result = {};
    }
    for (var key in src) {
      if (hasOwnProperty.call(src, key) && !__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__isUndefined__["a" /* default */])(src[key]) && result[key] !== src[key] && result !== src[key]) {
        result[key] = mergeDeepBase(result[key], src[key]);
      }
    }
    return result;
  }
  if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__isUndefined__["a" /* default */])(src)) {
    result = src;
  }
  return result;
}

/* harmony default export */ __webpack_exports__["a"] = (mergeDeepBase);

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__isString__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__isArray__ = __webpack_require__(0);



var utils = {};
utils.toArray = function (params) {
  var array = [];
  if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__isString__["a" /* default */])(params)) {
    array = params.split(',');
  } else if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__isArray__["a" /* default */])(params)) {
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
/* 13 */
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
/* 14 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(41)

var Component = __webpack_require__(8)(
  /* script */
  __webpack_require__(16),
  /* template */
  __webpack_require__(37),
  /* scopeId */
  "data-v-3fe95023",
  /* cssModules */
  null
)
Component.options.__file = "D:\\jcc\\tree-vue\\src\\tree-vue\\xTree.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] xTree.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-3fe95023", Component.options)
  } else {
    hotAPI.reload("data-v-3fe95023", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 15 */,
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_merge_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_mergeDeep_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_utils_js__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__methods_js__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__xTreeItem_vue__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__xTreeItem_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__xTreeItem_vue__);








/* harmony default export */ __webpack_exports__["default"] = ({
  name: "x-tree",
  components: {
    xTreeItem: __WEBPACK_IMPORTED_MODULE_4__xTreeItem_vue___default.a
  },
  props: {
    data: Array,
    options: Object,
    fn: Object
  },
  data: function data() {
    this.opts = __WEBPACK_IMPORTED_MODULE_3__methods_js__["a" /* default */]._initOptions(this.options);
    this.tree = __WEBPACK_IMPORTED_MODULE_3__methods_js__["a" /* default */]._arrayToTree(this.data, this.opts);
    this.tree = this.initTree(this.tree, this.opts);
    this.tree.fn = __WEBPACK_IMPORTED_MODULE_3__methods_js__["a" /* default */];
    this.tree.opts = this.opts;
    this.exportFn();
    return {
      dataTree: this.tree,
      opts: this.opts,
      fnfn: __WEBPACK_IMPORTED_MODULE_3__methods_js__["a" /* default */]
    };
  },
  computed: {},
  methods: {
    initTree: function initTree(tree, options) {
      var treeChecked = options.sel_ids ? __WEBPACK_IMPORTED_MODULE_3__methods_js__["a" /* default */]._checkTreeByIds(tree, options.sel_ids) : tree;
      var treeExpand = options.expandIds ? __WEBPACK_IMPORTED_MODULE_3__methods_js__["a" /* default */]._expandTreeByIds(treeChecked, options.expandIds) : treeChecked;

      if (options.expandIds) {
        var ids = __WEBPACK_IMPORTED_MODULE_2__utils_utils_js__["a" /* default */].toArray(options.expandIds);
        var items = __WEBPACK_IMPORTED_MODULE_3__methods_js__["a" /* default */].getItemByIds(tree, ids);
        for (var i = 0; i < items.length; i++) {
          this.activeItem(items[i]);
        }
      }
      return treeExpand;
    },
    exportFn: function exportFn() {
      this.fn.getItems = this.getItems;
      this.fn.getIds = this.getIds;
      this.fn.getNames = this.getNames;
      this.fn.getItemById = this.getItemById;
      this.fn.locateItem = this.locateItem;
      this.fn.locateItems = this.locateItems;
      this.fn.activeItem = this.activeItem;
      this.fn.clearActive = this.clearActive;
      this.fn.setCustom = this.setCustom;
    },
    getItems: function getItems(type) {
      return __WEBPACK_IMPORTED_MODULE_3__methods_js__["a" /* default */].getItems(this.tree, type);
    },
    getIds: function getIds(type) {
      return __WEBPACK_IMPORTED_MODULE_3__methods_js__["a" /* default */].getIds(this.tree, type);
    },
    getNames: function getNames(type) {
      return __WEBPACK_IMPORTED_MODULE_3__methods_js__["a" /* default */].getNames(this.tree, type);
    },
    getItemById: function getItemById(id) {
      var item = __WEBPACK_IMPORTED_MODULE_3__methods_js__["a" /* default */].getItemById(this.tree, id);
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
      var item = __WEBPACK_IMPORTED_MODULE_3__methods_js__["a" /* default */].getItemById(this.tree, id);
      if (!item) {
        console.warn('没有找到对应的item');
        return;
      }
      item.expand = true;
      __WEBPACK_IMPORTED_MODULE_3__methods_js__["a" /* default */]._expandParent(item.parent, true);
      this.activeItem(item);
      return item;
    },
    locateItems: function locateItems(ids) {
      var tree = __WEBPACK_IMPORTED_MODULE_3__methods_js__["a" /* default */]._expandTreeByIds(this.tree, ids);
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
/* 17 */
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
      if (this.options.lazyLoad && this.hasChildren && this.model.expand === false) {
        var data = this.options.onLoad(this.model);
        this.model.children.length = 0;
        data.forEach(function (element) {
          this.model.children.push(element);
        }, this);
      }
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
/* 18 */,
/* 19 */,
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__xTree_vue__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__xTree_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__xTree_vue__);


__WEBPACK_IMPORTED_MODULE_0__xTree_vue___default.a.install = function (Vue) {
  Vue.component(__WEBPACK_IMPORTED_MODULE_0__xTree_vue___default.a.name, __WEBPACK_IMPORTED_MODULE_0__xTree_vue___default.a);
};

/* harmony default export */ __webpack_exports__["default"] = (__WEBPACK_IMPORTED_MODULE_0__xTree_vue___default.a);

/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_merge__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_mergeDeep__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_isString__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils_isArray__ = __webpack_require__(0);






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
  var opt = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_mergeDeep__["a" /* default */])({}, defOptions, options);
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
      temp = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils_merge__["a" /* default */])({}, arrayIn[i]);
      if (opt.checkbox && temp.is_check === undefined) {
        temp.is_check = false;
      }
      temp.parent = parent;
      temp.custom = null;
      temp.class = null;
      temp.style = null;
      temp.level = parent.level + 1;
      if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__utils_isString__["a" /* default */])(opt.expandIds) || __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils_isArray__["a" /* default */])(opt.expandIds)) {
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
  if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__utils_isString__["a" /* default */])(sel_ids)) {
    ids = sel_ids.split(',');
  } else if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils_isArray__["a" /* default */])(sel_ids)) {
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
  if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__utils_isString__["a" /* default */])(expand_ids)) {
    ids = expand_ids.split(',');
  } else if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils_isArray__["a" /* default */])(expand_ids)) {
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
  if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__utils_isString__["a" /* default */])(expand_ids)) {
    ids = expand_ids.split(',');
  } else if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils_isArray__["a" /* default */])(expand_ids)) {
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
  for (var i = 0; i < ids.length; i++) {
    if (tree.id == ids[i]) {
      result.push(tree);
      ids.splice(i, 1);
    }
  }
  if (ids.length && tree.children && tree.children.length) {
    for (var _i = 0; _i < tree.children.length; _i++) {
      var result2 = getItemByIds(tree.children[_i], ids);
      result = result.concat(result2);
      if (!ids.length) {
        break;
      }
    }
  }
  return result;
}

function changeItemKeyValue(item, key, value) {
  if (!item || !key) {
    return false;
  }
  var temp = item;
  temp[key] = value;
  return true;
}

function getCheckedItems(tree) {
  if (!tree) {
    return false;
  }
  var result = [];
  if (tree.is_check === true) {
    result.push(tree);
  }
  if (tree.children && tree.children.length) {
    for (var i = 0; i < tree.children.length; i++) {
      var result2 = getCheckedItems(tree.children[i]);
      result = result.concat(result2);
    }
  }
  return result;
}

function getItems(tree, typeIn) {
  if (!tree) {
    return false;
  }

  var type = void 0;
  var leaf = [];
  var node = [];
  var data = getCheckedItems(tree);

  if (!typeIn) {
    type = 1;
  } else {
    type = typeIn;
  }

  switch (type) {
    case 'node':
      data.forEach(function (n) {
        if (n.is_check === true && n.is_node === true) {
          node.push(n);
        }
      }, this);
      break;

    case 'leaf':
      data.forEach(function (n) {
        if (n.is_check === true && n.is_node === false) {
          leaf.push(n);
        }
      }, this);
      break;

    case 'merge':
      var nodeIds = [];
      data.forEach(function (n) {
        if (n.is_check === true && n.is_node === true && n.level !== 0) {
          nodeIds.push(n.id);
        }
      }, this);

      var clone = [];
      for (var index = 0; index < data.length; index++) {
        clone[index] = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils_merge__["a" /* default */])({}, data[index]);
      }

      for (var _index = 0; _index < clone.length; _index++) {
        if (nodeIds.indexOf(clone[_index].nodeId) != -1 || !clone[_index].is_check || clone[_index].level === 0) {
          clone[_index] = null;
        }
      }
      clone.forEach(function (n) {
        if (n && n.is_node === true) {
          node.push(n);
        } else if (n && n.is_node === false) {
          leaf.push(n);
        }
      }, this);
      break;
    case 'all':
    default:
      data.forEach(function (n) {
        if (n.is_check === true && n.is_node === true) {
          node.push(n);
        } else if (n.is_check === true && n.is_node === false) {
          leaf.push(n);
        }
      }, this);
      break;
  }

  return {
    node: node,
    leaf: leaf
  };
}

function getIds(tree, type) {
  var _this = this;

  var ids = {};
  var items = getItems(tree, type);

  var _loop = function _loop(key) {
    ids[key] = [];
    if (items.hasOwnProperty(key) && items[key].length > 0) {
      items[key].forEach(function (element) {
        ids[key].push(element.id);
      }, _this);
    }
  };

  for (var key in items) {
    _loop(key);
  }

  return ids;
}

function getNames(tree, type) {
  var _this2 = this;

  var names = {};
  var items = getItems(tree, type);

  var _loop2 = function _loop2(key) {
    names[key] = [];
    if (items.hasOwnProperty(key) && items[key].length > 0) {
      items[key].forEach(function (element) {
        names[key].push(element.name);
      }, _this2);
    }
  };

  for (var key in items) {
    _loop2(key);
  }
  return names;
}

function getItem(tree) {
  var data = getItems(tree);
  _traverseTree(model, getNameFn, name);
  return name;
}

function getId(model) {
  var name = [];
  _traverseTree(model, getNameFn, name);
  return name;
}

function getName(model) {
  var name = [];
  _traverseTree(model, getNameFn, name);
  return name;
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

  getItemById: getItemById,
  getItemByIds: getItemByIds,

  getItems: getItems,
  getIds: getIds,
  getNames: getNames,
  getItem: getItem,
  getId: getId,
  getName: getName
};

/* harmony default export */ __webpack_exports__["a"] = (fn);

/***/ }),
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(27), __esModule: true };

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

var core  = __webpack_require__(28)
  , $JSON = core.JSON || (core.JSON = {stringify: JSON.stringify});
module.exports = function stringify(it){ // eslint-disable-line no-unused-vars
  return $JSON.stringify.apply($JSON, arguments);
};

/***/ }),
/* 28 */
/***/ (function(module, exports) {

var core = module.exports = {version: '2.4.0'};
if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(7)();
// imports


// module
exports.push([module.i, "\n.x-tree-item[data-v-06489f54] {\n  position: relative;\n  font-size: 14px;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n}\n.x-tree-item-self[data-v-06489f54] {\n  position: relative;\n  padding: 0 2em 0 0.5em;\n}\n.x-tree-item-self[data-v-06489f54]:hover {\n  background: #E9EBEE;\n}\n.fa[data-v-06489f54] {\n  font-size: 14px;\n  width: 14px;\n  color: #999;\n}\n.icon-blank[data-v-06489f54] {\n  display: inline-block;\n  font-size: 14px;\n  width: 1em;\n}\n.x-tree-item-expand[data-v-06489f54] {\n}\n.x-tree-item-checkbox[data-v-06489f54] {\n}\n.x-tree-item-name[data-v-06489f54] {\n  display: inline-block;\n  vertical-align: bottom;\n  padding: 0 1em 0 0em;\n  width: calc(100% - 40px);\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.x-tree-item-name-tip[data-v-06489f54] {\n  position: absolute;\n  top: -20px;\n  left: 0px;\n  display: inline-block;\n  padding: 0 15px;\n  border: 1px solid #fff;\n  background: #fff;\n}\n.x-tree-item-edit[data-v-06489f54] {\n  display: none;\n  position: absolute;\n  top: 0.36em;\n  right: 0.27em;\n}\n.x-tree-item-self:hover .x-tree-item-edit[data-v-06489f54] {\n  display: block;\n}\n.x-tree-item-editor[data-v-06489f54] {\n  display: block;\n  position: absolute;\n  right: 0;\n  width: 120px;\n  z-index: 99;\n  box-shadow: 0 1px 4px #999;\n  background: #fff;\n}\n.x-tree-item-editor-item[data-v-06489f54] {\n  display: block;\n  padding: 2px 35px 2px 15px;\n}\n.x-tree-item-editor-item[data-v-06489f54]:hover {\n  background: #E9EBEE;\n}\n.x-tree-item-children[data-v-06489f54] {\n  /*padding-left: 1.3em;*/\n}\n.editable_false[data-v-06489f54] {\n  padding-right: 0;\n}\n.x-tree-node>.editable_false>.x-tree-item-name[data-v-06489f54] {\n  padding: 0;\n  width: calc(100% - 37px);\n}\n.x-tree-leaf>.editable_false>.x-tree-item-name[data-v-06489f54] {\n  padding: 0;\n  width: calc(100% - 20px);\n}\n\n", ""]);

// exports


/***/ }),
/* 30 */,
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(7)();
// imports


// module
exports.push([module.i, "\n.x-tree-root[data-v-3fe95023] {\n  position: relative;\n  cursor: pointer;\n  font-size: 1em;\n  line-height: 1.8em;\n  white-space: nowrap;\n}\n\n", ""]);

// exports


/***/ }),
/* 32 */,
/* 33 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(39)

var Component = __webpack_require__(8)(
  /* script */
  __webpack_require__(17),
  /* template */
  __webpack_require__(35),
  /* scopeId */
  "data-v-06489f54",
  /* cssModules */
  null
)
Component.options.__file = "D:\\jcc\\tree-vue\\src\\tree-vue\\xTreeItem.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] xTreeItem.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-06489f54", Component.options)
  } else {
    hotAPI.reload("data-v-06489f54", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 34 */,
/* 35 */
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
     require("vue-hot-reload-api").rerender("data-v-06489f54", module.exports)
  }
}

/***/ }),
/* 36 */,
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "x-tree-root"
  }, [_c('div', {
    staticClass: "x-tree-head"
  }, [_c('span', [_vm._v(_vm._s(_vm.options.title))]), _vm._v(" "), _c('span', [_vm._v(_vm._s(_vm.root.is_check ? "全选" : "全不选"))]), _vm._v(" "), _c('span', [_vm._v("反选")]), _vm._v(" "), _c('span', [_vm._v("全部折叠")]), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.filterText),
      expression: "filterText"
    }],
    attrs: {
      "type": "text",
      "placeholder": "请输入关键字进行过滤"
    },
    domProps: {
      "value": (_vm.filterText)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.filterText = $event.target.value
      }
    }
  }), _vm._v(" "), _c('span', [_vm._v("当前选中：" + _vm._s(_vm.options.title) + "。显示规则：" + _vm._s(_vm.options.title) + "。")])]), _vm._v(" "), _c('div', {
    staticClass: "x-tree-body"
  }, [_vm._l((_vm.root.children), function(model) {
    return _c('x-tree-item', {
      attrs: {
        "model": model,
        "tree": _vm.tree,
        "options": _vm.options,
        "fn": _vm.fn
      }
    })
  }), _vm._v(" "), (!_vm.root.children || _vm.root.children.length === 0) ? _c('div', {
    staticClass: "x-tree-body-empty"
  }, [_c('span', {
    staticClass: "x-tree-body-empty-text"
  }, [_vm._v(_vm._s(_vm.emptyText))])]) : _vm._e()], 2)])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-3fe95023", module.exports)
  }
}

/***/ }),
/* 38 */,
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(29);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(9)("096f012b", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-06489f54\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./xTreeItem.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-06489f54\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./xTreeItem.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 40 */,
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(31);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(9)("62fa652b", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-3fe95023\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./xTree.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-3fe95023\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./xTree.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ })
/******/ ]);