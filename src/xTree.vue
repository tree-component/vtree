<template>
    <div class="x-tree-wrapper">
        <x-tree-item class="x-tree-root" :model="treeModel" :options="treeOptions"></x-tree-item>
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
            var treeModelTemp = this._arrayToTree(this.dataarray);

            var treeModelChecked = this._checkTreeByIds(treeModelTemp, this.options.sel_ids);

            return {
                treeModel: treeModelChecked,
                treeOptions: this.options
            };
        },
        computed: {},
        methods: {
            _arrayToTree: function (arrayIn) {
                var rootId = this._getTreeRoot(arrayIn);
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
                treeData.children = this._getSubTree(arrayIn, treeData);
                return treeData;
            },

            _getTreeRoot: function (arrayIn) {
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
                rootId = this._uniqueArray(rootId);

                if (rootId.length > 1) {
                    console.log('warning: rootId不唯一', rootId);
                } else if (rootId.length <= 0) {
                    console.log('warning: 没有rootId', rootId);
                }

                return rootId[0];
            },

            _uniqueArray: function (arrayIn) {
                var ua = [];
                for (var i = 0; i < arrayIn.length; i++) {
                    if (ua.indexOf(arrayIn[i]) == -1) {
                        ua.push(arrayIn[i]);
                    }
                }
                return ua;
            },

            _getSubTree: function (arrayIn, parent) {
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
                            temp.children = this._getSubTree(arrayIn, temp);
                        } else {
                            temp.expand = false;
                            temp.children = [];
                        }
                        result.push(temp);
                    }
                }
                return result;
            },

            _checkTreeByIds: function (tree, sel_ids) {
                var ids = sel_ids.split(',');

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
        created() {
            this.options.onInit(this.treeModel);
        }
    };
</script>

<style scoped>

</style>
