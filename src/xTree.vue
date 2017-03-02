<template>
    <div class="x-tree-wrapper">
        <x-tree-item class="x-tree-root" :model="treeModel" :options="treeOptions" :method="fn"
                     ref="treeItem"></x-tree-item>
    </div>
</template>

<script>
    import xTreeItem from './xTreeItem.vue';

    export default {
        name: "x-tree",
        components: {
            xTreeItem
        },
        props: {
            dataarray: Array,
            options: Object
        },
        data: function () {
            var fn = this._fn();
            var treeModelTemp = fn._arrayToTree(this.dataarray);

            var treeModelChecked = fn._checkTreeByIds(treeModelTemp, this.options.sel_ids);

            return {
                fn: fn,
                treeModel: treeModelChecked,
                treeOptions: this.options
            };
        },
        computed: {},
        methods: {
            _fn: function () {
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
                        itemAmount: arrayIn.length,
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

                function getName() {
                    var name = [];
                    _traverseTree(this.treeModel, getNameFn, name);
                    return name;
                }

                function getNameFn(item,name) {
                    if(item.is_check){
                        name.push(item.name);
                    }
                }

                return {
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
                }
            }
        }
    };
</script>

<style scoped>

</style>
