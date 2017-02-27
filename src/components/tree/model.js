module.exports = {
    _arrayToTree: function (arrayIn) {
        var rootId = _getTreeRoot(arrayIn);
        var treeData = {
            amount: arrayIn.length,
            id: rootId,
            name: 'ROOT',
            is_node: true,
            is_check: false,
            children: [],
            expand: true,
            parent: null,
            level: 0
        };
        treeData.children = _getSubTree(arrayIn, treeData);
        return treeData;
    },

    _getTreeRoot: function (arrayIn) {
        var rootId = [];
        var clone = $.extend(true, [], arrayIn);
        for (var i = 0, len = arrayIn.length; i < len; i++) {
            for (var j = i; j < len; j++) {
                if (arrayIn[i].id === arrayIn[j].nodeId) {
                    clone[j] = null;
                }
                if (arrayIn[i].nodeId === arrayIn[j].id) {
                    clone[i] = null;
                }
            }
        }
        $.each(clone, function (i, t) {
            if (t) {
                rootId.push(t.nodeId);
            }
        });

        // 去除数组重复值
        // 方法一
        // function unique(array) {
        //     var n = [];
        //     for (var i = 0; i < array.length; i++) {
        //         if (n.indexOf(array[i]) == -1) {
        //             n.push(array[i]);
        //         }
        //     }
        //     return n;
        // }

        // 方法二
        function unique(array) {
            var r = [];
            for (var i = 0, len = array.length; i < len; i++) {
                for (var j = i + 1; j < len; j++) {
                    if (array[i] === array[j]) {
                        j = ++i;
                    }
                }
                r.push(array[i]);
            }
            return r;
        }

        rootId = unique(rootId);

        if (rootId.length > 1) {
            console.log('warning: rootId不唯一', rootId);
        } else {
            if (rootId.length <= 0) {
                console.log('warning: 没有rootId', rootId);
            }
        }

        return rootId[0];
    },

    _getSubTree: function (arrayIn, parent) {
        var result = [];
        var temp = {};
        for (var i = 0; i < arrayIn.length; i++) {
            if (arrayIn[i].nodeId === parent.id) {
                temp = {
                    id: arrayIn[i].id,
                    name: arrayIn[i].name,
                    nodeId: arrayIn[i].nodeId,
                    is_node: arrayIn[i].is_node,
                    is_check: arrayIn[i].is_check
                }; //copy
                temp.parent = parent;
                temp.level = parent.level + 1;
                if (arrayIn[i].is_node) {
                    temp.expand = true;
                    temp.children = _getSubTree(arrayIn, temp);
                }
                result.push(temp);
            }
        }
        return result;
    },

    _checkTreeByIds: function (tree, sel_ids) {
        var ids = sel_ids.split(',');
        for (var i = 0; i < ids.length; i++) {
            ids[i] = parseInt(ids[i]);
        }
        _traverseTree(tree, _checkTreeByIdsFn, ids);

        return tree;
    },

    _checkTreeByIdsFn: function (item, ids) {
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
    },

    _traverseTree: function (tree, fn, input, output) {
        if (!tree) {
            return true;
        }
        var _continue = fn(tree, input, output);//是否继续遍历
        if (_continue.children && tree.children) {
            for (var i = 0; i < tree.children.length; i++) {
                var brother = _traverseTree(tree.children[i], fn, input, output);
                if (!brother) {
                    break;
                }
            }
        }
        return _continue.brother;
    },

    _changeItem: function (item, change) {
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
    },

    _changeChildren: function (children, change) {
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
    },

    _changeParent: function (parent, change) {
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
    },
};