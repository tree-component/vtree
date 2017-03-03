/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

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

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 13);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

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
/* 1 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(10)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(2),
  /* template */
  __webpack_require__(8),
  /* scopeId */
  "data-v-20545fcf",
  /* cssModules */
  null
)
Component.options.__file = "D:\\jcc\\vue-tree\\src\\xTree.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] xTree.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-20545fcf", Component.options)
  } else {
    hotAPI.reload("data-v-20545fcf", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__methods__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__methods___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__methods__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__xTreeItem_vue__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__xTreeItem_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__xTreeItem_vue__);
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = {
    name: "x-tree",
    components: {
        xTreeItem: __WEBPACK_IMPORTED_MODULE_1__xTreeItem_vue___default.a
    },
    props: {
        data: Array,
        options: Object
    },
    data: function () {
        var treeTemp = __WEBPACK_IMPORTED_MODULE_0__methods___default.a._arrayToTree(this.data);

        var treeChecked = __WEBPACK_IMPORTED_MODULE_0__methods___default.a._checkTreeByIds(treeTemp, this.options.sel_ids);

        return {
            fn: __WEBPACK_IMPORTED_MODULE_0__methods___default.a,
            model: treeChecked
        };
    },
    computed: {},
    methods: {}
};

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = {
    name: 'x-tree-item',
    props: {
        model: Object,
        options: Object,
        fn: Object
    },
    data: function () {
        return {
            treeOptions: this.options,
            showEditor: false
        };
    },
    computed: {
        hasChildren: function () {
            return this.model.is_node && this.model.children && this.model.children.length;
        },
        state: function () {
            var state = '';
            if (!this.hasChildren) {
                state = this.model.is_check;
            } else if (this.model.is_check === true) {
                state = true;
            } else {
                state = false;
                for (var i = 0; i < this.model.children.length; i++) {
                    if (this.model.children[i].is_check === true) {
                        state = 'tristate';
                        break;
                    }
                }
            }
            return state;
        },
        checkboxIcon: function () {
            var faIcon = '';
            if (this.state === true) {
                faIcon = 'fa-check-square-o';
            } else if (this.state === false) {
                faIcon = 'fa-square-o';
            } else if (this.state === 'tristate') {
                faIcon = 'fa-minus-square-o';
            }
            return faIcon;
        }
    },
    methods: {
        expandFn: function () {
            console.log(this.model.expand);
            if (this.hasChildren) {
                this.model.expand = !this.model.expand;
            }
            console.log(this.model.expand);
        },
        checkFn: function () {
            this.fn._changeItem(this.model, !this.model.is_check);
        },

        nameFn: function () {
            console.log("this.hasChildren", this.hasChildren);
            this.options.onName(this.model);
        },

        hideEditorFn: function () {
            this.showEditor = false;
        },

        showEditorFn: function () {
            this.showEditor = !this.showEditor;
        },

        editFn: function () {
            this.options.onEdit(this.model);
            this.showEditor = !this.showEditor;
        },

        deleteFn: function () {
            var index = this.model.parent.children.indexOf(this.model);

            this.model.parent.children.splice(index, 1);
            this.options.onDelete(this.model);
            this.showEditor = !this.showEditor;
        },

        addChildFn: function () {
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
            this.options.onAddChild(newChild);
            this.showEditor = !this.showEditor;
        }
    }
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
function _arrayToTree(arrayIn) {
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
        itemAmount: arrayIn.length
    };
    treeData.children = _getSubTree(arrayIn, treeData);
    return treeData;
}

function _getTreeRoot(arrayIn) {
    var rootId = [];
    var clone = JSON.parse(JSON.stringify(arrayIn));
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

function _getSubTree(arrayIn, parent) {
    var result = [];
    var temp = {};
    for (var i = 0; i < arrayIn.length; i++) {
        if (arrayIn[i].nodeId == parent.id) {
            //                        temp = arrayIn[i];
            temp = {
                id: arrayIn[i].id,
                name: arrayIn[i].name,
                nodeId: arrayIn[i].nodeId,
                is_node: arrayIn[i].is_node,
                is_check: arrayIn[i].is_check
            }; //copy
            temp.checkState = temp.is_check;
            temp.parent = parent;
            temp.level = parent.level + 1;
            if (temp.is_node) {
                temp.expand = true;
                temp.children = _getSubTree(arrayIn, temp);
            } else {
                temp.expand = false;
                temp.children = [];
            }
            result.push(temp);
        }
    }
    return result;
}

function _checkTreeByIds(tree, sel_ids) {
    var ids = sel_ids.split(',');

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

function _traverseTree(tree, fn, input, output) {
    if (!tree) {
        return true;
    }
    var _continue = fn(tree, input, output); //是否继续遍历
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
    if (item.children) {
        _changeChildren(item.children, change);
    }
    if (item.parent) {
        _changeParent(item.parent, change);
    }
}

function _changeChildren(children, change) {
    if (!children) {
        return false;
    }
    for (var i = 0; i < children.length; i++) {
        if (children[i].is_check != change) {
            children[i].is_check = change;
            if (children[i].children) {
                _changeChildren(children[i].children, change);
            }
        }
    }
    return true;
}

// function _changeParent(parent, change) {
//     if (!parent) {
//         return false;
//     }
//     var old = parent.is_check;
//     var len = parent.children.length;
//
//     if (change === "tristate") {
//         parent.is_check = "tristate";
//     } else if (change === true) {
//         var n = 0;
//         for (var i = 0; i < len; i++) {
//             if (parent.children[i].is_check === true) {
//                 n += 1;
//             } else {
//                 parent.is_check = "tristate";
//                 break;
//             }
//         }
//         if (n === len) {
//             parent.is_check = true;
//         }
//     } else if (change === false) {
//         var m = 0;
//         for (var j = 0; j < len; j++) {
//             if (parent.children[j].is_check === false) {
//                 m += 1;
//             } else {
//                 parent.is_check = "tristate";
//                 break;
//             }
//         }
//         if (m === len) {
//             parent.is_check = false;
//         }
//     }
//
//     if (parent.parent && parent.is_check != old) {
//         _changeParent(parent.parent, parent.is_check);
//     }
//     return true;
// }

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

var fn = {
    _arrayToTree: _arrayToTree,

    _getTreeRoot: _getTreeRoot,

    _uniqueArray: _uniqueArray,

    _getSubTree: _getSubTree,

    _checkTreeByIds: _checkTreeByIds,

    _checkTreeByIdsFn: _checkTreeByIdsFn,

    _traverseTree: _traverseTree,

    _changeItem: _changeItem,

    _changeChildren: _changeChildren,

    _changeParent: _changeParent,

    getName: getName,

    getNameFn: getNameFn
};

exports.default = fn;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(6)();
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", ""]);

// exports


/***/ }),
/* 6 */
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
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(3),
  /* template */
  __webpack_require__(9),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "D:\\jcc\\vue-tree\\src\\xTreeItem.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] xTreeItem.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-e6c1ebfc", Component.options)
  } else {
    hotAPI.reload("data-v-e6c1ebfc", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "x-tree-wrapper"
  }, [_c('x-tree-item', {
    ref: "treeItem",
    staticClass: "x-tree-root",
    attrs: {
      "model": _vm.model,
      "options": _vm.options,
      "fn": _vm.fn
    }
  })], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-20545fcf", module.exports)
  }
}

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "x-tree-item"
  }, [_c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.model.level),
      expression: "model.level"
    }],
    staticClass: "x-tree-item-self"
  }, [_c('i', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.hasChildren),
      expression: "hasChildren"
    }],
    staticClass: "x-tree-item-expand fa",
    class: _vm.model.expand ? 'fa-minus' : 'fa-plus',
    on: {
      "click": _vm.expandFn
    }
  }), _vm._v(" "), _c('span', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (!_vm.hasChildren),
      expression: "!hasChildren"
    }],
    staticClass: "icon-blank"
  }), _vm._v(" "), _c('i', {
    staticClass: "x-tree-item-checkbox fa",
    class: _vm.checkboxIcon,
    on: {
      "click": _vm.checkFn
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "x-tree-item-name",
    on: {
      "click": _vm.nameFn
    }
  }, [_vm._v(_vm._s(_vm.model.name))]), _vm._v(" "), _c('i', {
    staticClass: "x-tree-item-list fa",
    class: !_vm.showEditor ? 'fa-caret-down' : 'fa-caret-up',
    on: {
      "click": _vm.showEditorFn
    }
  }), _vm._v(" "), _c('span', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.showEditor),
      expression: "showEditor"
    }],
    staticClass: "x-tree-item-editor",
    on: {
      "mouseleave": _vm.hideEditorFn
    }
  }, [_c('span', {
    staticClass: "x-tree-item-editor-item",
    on: {
      "click": _vm.editFn
    }
  }, [_vm._v("修改部门")]), _vm._v(" "), _c('span', {
    staticClass: "x-tree-item-editor-item",
    on: {
      "click": _vm.deleteFn
    }
  }, [_vm._v("删除部门")]), _vm._v(" "), _c('span', {
    staticClass: "x-tree-item-editor-item",
    on: {
      "click": _vm.addChildFn
    }
  }, [_vm._v("添加子部门")])])]), _vm._v(" "), (_vm.hasChildren) ? _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.model.expand),
      expression: "model.expand"
    }],
    staticClass: "x-tree-item-children"
  }, _vm._l((_vm.model.children), function(model) {
    return _c('x-tree-item', {
      ref: "treeItem",
      refInFor: true,
      attrs: {
        "model": model,
        "options": _vm.treeOptions,
        "fn": _vm.fn
      }
    })
  })) : _vm._e()])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-e6c1ebfc", module.exports)
  }
}

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(5);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(11)("5697fec0", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-20545fcf\",\"scoped\":true,\"hasInlineConfig\":false}!../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./xTree.vue", function() {
     var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-20545fcf\",\"scoped\":true,\"hasInlineConfig\":false}!../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./xTree.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 11 */
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

var listToStyles = __webpack_require__(12)

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

function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = { css: css, media: media, sourceMap: sourceMap }
    if (!newStyles[id]) {
      part.id = parentId + ':0'
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      part.id = parentId + ':' + newStyles[id].parts.length
      newStyles[id].parts.push(part)
    }
  }
  return styles
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
  var hasSSR = styleElement != null

  // if in production mode and style is already provided by SSR,
  // simply do nothing.
  if (hasSSR && isProduction) {
    return noop
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = styleElement || createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (!hasSSR) {
    update(obj)
  }

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
/* 12 */
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
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _xTree = __webpack_require__(1);

var _xTree2 = _interopRequireDefault(_xTree);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Vue.component("x-tree", _xTree2.default);

/***/ })
/******/ ]);