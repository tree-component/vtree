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
/******/ 	return __webpack_require__(__webpack_require__.s = 26);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
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
/* 1 */
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
/* 2 */
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

var listToStyles = __webpack_require__(3)

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
/* 3 */
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
/* 4 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(23)

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(6),
  /* template */
  __webpack_require__(19),
  /* scopeId */
  "data-v-68d3a8da",
  /* cssModules */
  null
)
Component.options.__file = "D:\\jcc\\vue-tree\\src\\components\\x-tree-radio\\xTree.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] xTree.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-68d3a8da", Component.options)
  } else {
    hotAPI.reload("data-v-68d3a8da", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 5 */,
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _methods = __webpack_require__(10);

var _methods2 = _interopRequireDefault(_methods);

var _xTreeItem = __webpack_require__(16);

var _xTreeItem2 = _interopRequireDefault(_xTreeItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//

exports.default = {
    name: "x-tree",
    components: {
        xTreeItem: _xTreeItem2.default
    },
    props: {
        data: Array,
        options: Object
    },
    data: function data() {
        var opt = _methods2.default._initOptions(this.options);

        var treeTemp = _methods2.default._arrayToTree(this.data, opt);

        var treeChecked = _methods2.default._checkTreeByIds(treeTemp, opt.sel_ids);

        return {
            opt: opt,
            fn: _methods2.default,
            tree: treeChecked
        };
    },
    computed: {},
    methods: {}
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
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
//
//
//
//

exports.default = {
    name: 'x-tree-item',
    props: {
        model: Object,
        options: Object,
        fn: Object,
        tree: Object
    },
    data: function data() {
        return {
            showEditor: false
        };
    },
    computed: {
        hasChildren: function hasChildren() {
            return this.model.is_node && this.model.children && this.model.children.length;
        },
        checkboxIcon: function checkboxIcon() {
            var faIcon = '';
            if (this.model.checkState === true) {
                faIcon = 'fa-check-square-o';
            } else if (this.model.checkState === false) {
                faIcon = 'fa-square-o';
            } else if (this.model.checkState === 'z') {
                faIcon = 'fa-minus-square-o';
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
                console.log("this.tree", this.tree.children[0].children[0]);
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
            var brother;
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
    },

    created: function created() {
        //            if(this.tree.accordion) {
        //                this.$on('el-tree-node-expand', function (node) {
        //                    if(this.node !== node) {
        //                        this.node.collapse();
        //                    }
        //                });
        //            }
    }
};

/***/ }),
/* 8 */,
/* 9 */,
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
function _initOptions(options) {
    var defOptions = {
        zIndex: 9,
        is_trigger: false, //是否需要触发? 否则直接显示
        has_search: false,
        only_child: true, //是否结果只要 child
        node_merge: true, //结果只显示最上层  比如   中国被选中  四川,成都则不会显示  否则 每个被勾选的节点都显示
        is_multi: true, //是否多选
        expand: true, //是否展开，false、true、num,(0、1、false,都展开一级。true,完全展开。num>=2时，展开到对应级）
        width: null,
        maxHeight: 300,
        sel_ids: '',
        checkbox: false,
        editable: true,
        onExpand: function onExpand() {},
        onClick: function onClick() {},

        onCheck: function onCheck() {},

        onEdit: function onEdit() {},

        onDelete: function onDelete() {},

        onAddChild: function onAddChild() {},

        onSort: function onSort() {}
    };
    var opt = Object.assign({}, defOptions, options);
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
        options: opt,
        itemAmount: arrayIn.length
    };
    treeData.children = _getSubTree(arrayIn, treeData, opt);
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

function _getSubTree(arrayIn, parent, opt) {
    var result = [];
    var temp = {};
    for (var i = 0; i < arrayIn.length; i++) {
        if (arrayIn[i].nodeId == parent.id) {
            // // temp = arrayIn[i];
            // temp = {
            //     id: arrayIn[i].id,
            //     name: arrayIn[i].name,
            //     nodeId: arrayIn[i].nodeId,
            //     is_node: arrayIn[i].is_node,
            //     is_check: arrayIn[i].is_check
            // }; //copy
            temp = Object.assign({}, arrayIn[i]);
            temp.parent = parent;
            temp.level = parent.level + 1;

            if (opt.expand === true) {
                temp.expand = true;
            } else if (opt.expand === false && temp.level <= 0) {
                temp.expand = true;
            } else if (temp.level <= opt.expand) {
                temp.expand = true;
            } else {
                temp.expand = false;
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

    if (change === "z") {
        parent.checkState = "z";
    } else if (change === true) {
        var n = 0;
        for (var i = 0; i < len; i++) {
            if (parent.children[i].checkState === true) {
                n += 1;
            } else {
                parent.checkState = "z";
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
                parent.checkState = "z";
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

var fn = {
    _initOptions: _initOptions,

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

    getNameFn: getNameFn,

    getItemById: getItemById
};

exports.default = fn;

/***/ }),
/* 11 */,
/* 12 */,
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, "\n.x-tree-wrapper[data-v-68d3a8da] {\n    position: relative;\n    cursor: pointer;\n    font-size: 1em;\n    line-height: 1.8em;\n    white-space: nowrap;\n}\n", ""]);

// exports


/***/ }),
/* 14 */,
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, "\n.x-tree-item[data-v-fa2654e6] {\n    position: relative;\n    font-size: 14px;\n    -webkit-user-select: none;\n    -moz-user-select: none;\n    -ms-user-select: none;\n    user-select: none;\n}\n.x-tree-item-self[data-v-fa2654e6] {\n    padding: 0 2em 0 0.5em;\n}\n.x-tree-item-self[data-v-fa2654e6]:hover {\n    background: #E9EBEE;\n}\n.fa[data-v-fa2654e6] {\n    font-size: 14px;\n    width: 14px;\n    color: #999;\n}\n.icon-blank[data-v-fa2654e6] {\n    display: inline-block;\n    font-size: 14px;\n    width: 1em;\n}\n.x-tree-item-expand[data-v-fa2654e6] {\n}\n.x-tree-item-checkbox[data-v-fa2654e6] {\n}\n.x-tree-item-name[data-v-fa2654e6] {\n    display: inline-block;\n    vertical-align: bottom;\n    padding: 0 1em 0 0.2em;\n    width: calc(100% - 40px);\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n}\n.x-tree-item-edit[data-v-fa2654e6] {\n    display: none;\n    position: absolute;\n    top: 0.36em;\n    right: 0.27em;\n}\n.x-tree-item-self:hover .x-tree-item-edit[data-v-fa2654e6] {\n    display: block;\n}\n.x-tree-item-editor[data-v-fa2654e6] {\n    display: block;\n    position: absolute;\n    right: 0;\n    width: 120px;\n    z-index: 99;\n    box-shadow: 0 1px 4px #999;\n    background: #fff;\n}\n.x-tree-item-editor-item[data-v-fa2654e6] {\n    display: block;\n    padding: 2px 35px 2px 15px;\n}\n.x-tree-item-editor-item[data-v-fa2654e6]:hover {\n    background: #E9EBEE;\n}\n.x-tree-item-children[data-v-fa2654e6] {\n    padding-left: 1.5em;\n}\n.padding-left-0[data-v-fa2654e6] {\n    padding-left: 0;\n}\n", ""]);

// exports


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(25)

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(7),
  /* template */
  __webpack_require__(21),
  /* scopeId */
  "data-v-fa2654e6",
  /* cssModules */
  null
)
Component.options.__file = "D:\\jcc\\vue-tree\\src\\components\\x-tree-radio\\xTreeItem.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] xTreeItem.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-fa2654e6", Component.options)
  } else {
    hotAPI.reload("data-v-fa2654e6", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 17 */,
/* 18 */,
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "x-tree-wrapper"
  }, [_c('x-tree-item', {
    staticClass: "x-tree-root",
    attrs: {
      "model": _vm.tree,
      "tree": _vm.tree,
      "options": _vm.opt,
      "fn": _vm.fn
    }
  })], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-68d3a8da", module.exports)
  }
}

/***/ }),
/* 20 */,
/* 21 */
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
    staticClass: "x-tree-item-self",
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
    staticClass: "x-tree-item-checkbox fa",
    class: _vm.options.checkbox ? _vm.checkboxIcon : 'fa-folder-o',
    on: {
      "click": _vm.checkFn
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "x-tree-item-name",
    on: {
      "click": _vm.nameFn
    }
  }, [_vm._v(_vm._s(_vm.model.name))]), _vm._v(" "), (_vm.options.editable) ? _c('i', {
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
  }, [_vm._v("修改部门")]), _vm._v(" "), _c('span', {
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
  }, [_vm._v("删除部门")]), _vm._v(" "), _c('span', {
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
  }, [_vm._v("添加子部门")]), _vm._v(" "), _c('span', {
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
  }, [_vm._v("上移")]), _vm._v(" "), _c('span', {
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
  }, [_vm._v("下移")]), _vm._v(" "), _c('span', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.cantEdit),
      expression: "cantEdit"
    }],
    staticClass: "x-tree-item-editor-item"
  }, [_vm._v("无法操作")])]) : _vm._e()]), _vm._v(" "), (_vm.hasChildren) ? _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.model.expand),
      expression: "model.expand"
    }],
    staticClass: "x-tree-item-children",
    class: _vm.model.level ? '' : 'padding-left-0'
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
     require("vue-hot-reload-api").rerender("data-v-fa2654e6", module.exports)
  }
}

/***/ }),
/* 22 */,
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(13);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("6bb6d028", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-68d3a8da\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./xTree.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-68d3a8da\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./xTree.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 24 */,
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(15);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("744c77e2", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-fa2654e6\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./xTreeItem.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-fa2654e6\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./xTreeItem.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _xTree = __webpack_require__(4);

var _xTree2 = _interopRequireDefault(_xTree);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Vue.component("x-tree", _xTree2.default);

/***/ })
/******/ ]);