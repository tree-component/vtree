<template>
    <div class="x-tree-wrapper">
        <x-tree-item class="x-tree-root" :model="treeData"></x-tree-item>
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
            model: Object
        },
        data: function () {
            var treeDataTemp = this._arrayToTree(this.model.data);

            var treeDataChecked = this._checkTreeByIds(treeDataTemp, this.model.sel_ids);

            console.log("treeDataComputed", treeDataChecked);

            return {
                treeData: treeDataChecked
            };
        },
        computed: {},
        methods: {
            _arrayToTree: function (arrayIn) {
                var rootId = this._getTreeRoot(arrayIn);
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
                treeData.children = this._getSubTree(arrayIn, treeData);
                return treeData;
            },

            _getTreeRoot: function (arrayIn) {
                var rootId = [];
                var clone = this._cloneArray(arrayIn);
//                var clone = JSON.parse(JSON.stringify(arrayIn));
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
                console.log(clone);
                console.log("arrayIn",arrayIn);

                for (var k = 0; k < clone.length; k++) {
                    if (clone[k]) {
                        rootId.push(clone[k].nodeId);
                    }

                }

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

            _cloneArray: function (arrayIn) {
                var clone = [];

                for (var i = 0; i < arrayIn.length; i++) {
                    var temp = {
                        id: arrayIn[i].id,
                        name: arrayIn[i].name,
                        nodeId: arrayIn[i].nodeId,
                        is_node: arrayIn[i].is_node,
                        is_check: arrayIn[i].is_check
                    };
                    clone.push(temp);
                }
                return clone;
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
                            temp.children = this._getSubTree(arrayIn, temp);
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
                this._traverseTree(tree, this._checkTreeByIdsFn, ids);

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
                        this._changeItem(item, true);
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
                        var brother = this._traverseTree(tree.children[i], fn, input, output);
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
                    this._changeChildren(item.children, change);
                }
                if (item.parent) {
                    this._changeParent(item.parent, change);
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
                            this._changeChildren(children[i].children, change);
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
                    this._changeParent(parent.parent, change);
                }
                return true;
            },
        },
    };
</script>

<style scoped>

</style>
