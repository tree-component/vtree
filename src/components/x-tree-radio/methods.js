function _initOptions(options) {
    let defOptions = {
        zIndex: 9,
        is_trigger: false,  //是否需要触发? 否则直接显示
        has_search: false,
        only_child: true,//是否结果只要 child
        node_merge: true,//结果只显示最上层  比如   中国被选中  四川,成都则不会显示  否则 每个被勾选的节点都显示
        is_multi: true,//是否多选
        expand: true, //是否展开，false、true、num,(0、1、false,都展开一级。true,完全展开。num>=2时，展开到对应级）
        width: null,
        maxHeight: 300,
        sel_ids: '',
        checkbox: false,
        editable: true,
        onExpand: function () {
        },
        onClick: function () {
        },

        onCheck: function () {
        },

        onEdit: function () {
        },

        onDelete: function () {
        },

        onAddChild: function () {
        },

        onSort: function () {
        },
    };
    let opt = extend({}, defOptions, options);
    return opt;
}

function extend(out) {
    out = out || {};

    for (let i = 1; i < arguments.length; i++) {
        if (!arguments[i])
            continue;

        for (let key in arguments[i]) {
            if (arguments[i].hasOwnProperty(key))
                out[key] = arguments[i][key];
        }
    }

    return out;
};

function deepExtend(out) {
    out = out || {};

    for (let i = 1; i < arguments.length; i++) {
        let obj = arguments[i];

        if (!obj)
            continue;

        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                if (typeof obj[key] === 'object')
                    out[key] = deepExtend(out[key], obj[key]);
                else
                    out[key] = obj[key];
            }
        }
    }

    return out;
};

function _arrayToTree(arrayIn, opt) {
    let rootId = _getTreeRoot(arrayIn);
    let treeData = {
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
        itemAmount: arrayIn.length,
    };
    treeData.children = _getSubTree(arrayIn, treeData, opt);
    return treeData;
}

function _getTreeRoot(arrayIn) {
    let rootId = [];
    let clone = JSON.parse(JSON.stringify(arrayIn));
    for (let i = 0, len = arrayIn.length; i < len; i++) {
        for (let j = i; j < len; j++) {
            if (arrayIn[i].id == arrayIn[j].nodeId) {
                clone[j] = null;
            }
            if (arrayIn[i].nodeId == arrayIn[j].id) {
                clone[i] = null;
            }
        }
    }

    for (let k = 0; k < clone.length; k++) {
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
    let ua = [];
    for (let i = 0; i < arrayIn.length; i++) {
        if (ua.indexOf(arrayIn[i]) == -1) {
            ua.push(arrayIn[i]);
        }
    }
    return ua;
}

function _getSubTree(arrayIn, parent, opt) {
    let result = [];
    let temp = {};
    for (let i = 0; i < arrayIn.length; i++) {
        if (arrayIn[i].nodeId == parent.id) {
            // // temp = arrayIn[i];
            // temp = {
            //     id: arrayIn[i].id,
            //     name: arrayIn[i].name,
            //     nodeId: arrayIn[i].nodeId,
            //     is_node: arrayIn[i].is_node,
            //     is_check: arrayIn[i].is_check
            // }; //copy
            temp = extend({}, arrayIn[i]);
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
    let ids = sel_ids.split(',');

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
    for (let i = 0; i < ids.length; i++) {
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
    let _continue = fn(tree, input, output);//是否继续遍历
    if (_continue.children && tree.children) {
        for (let i = 0; i < tree.children.length; i++) {
            let brother = _traverseTree(tree.children[i], fn, input, output);
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
        _changeParentState(item.parent, change)
    }
}

function _changeChildrenState(children, change) {
    if (!children) {
        return false;
    }
    for (let i = 0; i < children.length; i++) {
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
    for (let i = 0; i < children.length; i++) {
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
    let old = parent.checkState;
    let len = parent.children.length;

    if (change === "z") {
        parent.checkState = "z";
    } else if (change === true) {
        let n = 0;
        for (let i = 0; i < len; i++) {
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
        let m = 0;
        for (let j = 0; j < len; j++) {
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
        for (let i = 0; i < parent.children.length; i++) {
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
    let name = [];
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
    }
}


function getItemById(tree, id) {
    if (!tree || id == undefined || id == null) {
        return false;
    }
    if (tree.id == id) {
        return tree;
    }
    if (tree.children && tree.children.length) {
        for (let i = 0; i < tree.children.length; i++) {
            let item = getItemById(tree.children[i], id);
            if (item) {
                return item;
            }
        }
    }
    return false;
}


let fn = {
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

    getItemById: getItemById,
};

export default fn;

