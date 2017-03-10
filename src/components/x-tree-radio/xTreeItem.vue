<template>
    <div class="x-tree-item">
        <div class="x-tree-item-self" v-show="model.level" @mouseleave="hideEditorFn">
            <i class="x-tree-item-expand fa" v-if="hasChildren"
               :class="model.expand ? 'fa-caret-down' : 'fa-caret-right'" @click="expandFn"></i>
            <span class="icon-blank" v-else></span>
            <i class="x-tree-item-checkbox fa" :class="options.checkbox ? checkboxIcon :'fa-folder-o' "
               @click="checkFn"></i>
            <span class="x-tree-item-name" @click="nameFn">{{model.name}}</span>
            <i class="x-tree-item-edit fa fa-caret-square-o-down" v-if="options.editable"
               @click.stop="showEditorFn"></i>
            <div class="x-tree-item-editor" v-if="options.editable" v-show="showEditor">
                <span class="x-tree-item-editor-item" v-show="model.is_edit" @click="editFn">修改部门</span>
                <span class="x-tree-item-editor-item" v-show="model.is_delete" @click="deleteFn">删除部门</span>
                <span class="x-tree-item-editor-item" v-show="model.is_add" @click="addChildFn">添加子部门</span>
                <span class="x-tree-item-editor-item" v-show="sortable.upAble" @click="sortFn(true)">上移</span>
                <span class="x-tree-item-editor-item" v-show="sortable.downAble" @click="sortFn(false)">下移</span>
                <span class="x-tree-item-editor-item" v-show="cantEdit">无法操作</span>
            </div>
        </div>
        <div class='x-tree-item-children' v-if="hasChildren" v-show="model.expand"
             :class="model.level ?  '' : 'padding-left-0' ">
            <x-tree-item v-for="model in model.children" :model="model" :options="options" :fn="fn">
            </x-tree-item>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'x-tree-item',
        props: {
            model: Object,
            options: Object,
            fn: Object
        },
        data: function () {
            return {
                showEditor: false
            };
        },
        computed: {
            hasChildren: function () {
                return this.model.is_node && this.model.children && this.model.children.length
            },
            checkboxIcon: function () {
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
            cantEdit: function () {
                return !this.model.is_edit && !this.model.is_delete && !this.model.is_add;
            },
            index: function () {
                if (!this.model.parent) {
                    return false;
                }
                return this.model.parent.children.indexOf(this.model);
            },
            sortable: function () {
                if (!this.model.parent || this.model.parent.children.length == 1) {
                    return {
                        upAble: false,
                        downAble: false
                    }
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
                }
            }
        },
        methods: {
            expandFn: function () {
                if (this.hasChildren) {
                    this.model.expand = !this.model.expand;
                    this.options.onExpand(this.model);
                }
            },

            checkFn: function () {
                this.fn._changeItem(this.model, !this.model.is_check);
                this.options.onCheck(this.model);
            },

            nameFn: function () {
                this.options.onClick(this.model);
            },

            nameFnn: function () {

            },

            showEditorFn: function () {
                this.showEditor = !this.showEditor;
            },

            hideEditorFn: function () {
                this.showEditor = false;
            },

            editFn: function () {
                this.options.onEdit(this.model, this.editFnn);
                this.showEditor = false;
            },

            editFnn: function (item, result) {

            },

            deleteFn: function () {
                this.options.onDelete(this.model, this.deleteFnn);
                this.showEditor = false;
            },

            deleteFnn: function (item, result) {
                var index = this.model.parent.children.indexOf(this.model);
                if (result) {
                    this.model.parent.children.splice(index, 1);
                }
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
                    children: [],
                };
                this.options.onAddChild(newChild, this.addChildFnn);
                this.showEditor = false;
            },

            addChildFnn: function (item, result) {
                if (result) {
                    item.parent.children.push(item);
                }
            },

            sortFn: function (type) {
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

            upFnn: function (item, result) {
                var index = this.model.parent.children.indexOf(this.model);
                if (result) {
                    this.model.parent.children.splice(index, 1);
                    this.model.parent.children.splice(index - 1, 0, this.model);
                }
            },

            downFnn: function (item, result) {
                var index = this.model.parent.children.indexOf(this.model);
                if (result) {
                    this.model.parent.children.splice(index, 1);
                    this.model.parent.children.splice(index + 1, 0, this.model);
                }
            }
        },

        created() {
//            if(this.tree.accordion) {
//                this.$on('el-tree-node-expand', function (node) {
//                    if(this.node !== node) {
//                        this.node.collapse();
//                    }
//                });
//            }
        }
    }
</script>

<style scoped>
    .x-tree-item {
        position: relative;
        font-size: 14px;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    .x-tree-item-self {
        padding: 0 2em 0 0.5em;
    }

    .x-tree-item-self:hover {
        background: #E9EBEE;
    }

    .fa {
        font-size: 14px;
        width: 14px;
        color: #999;
    }

    .icon-blank {
        display: inline-block;
        font-size: 14px;
        width: 1em;
    }

    .x-tree-item-expand {

    }

    .x-tree-item-checkbox {

    }

    .x-tree-item-name {
        display: inline-block;
        vertical-align: bottom;
        padding: 0 1em 0 0.2em;
        width: calc(100% - 40px);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .x-tree-item-edit {
        display: none;
        position: absolute;
        top: 0.36em;
        right: 0.27em;
    }

    .x-tree-item-self:hover .x-tree-item-edit {
        display: block;
    }

    .x-tree-item-editor {
        display: block;
        position: absolute;
        right: 0;
        width: 120px;
        z-index: 99;
        box-shadow: 0 1px 4px #999;
        background: #fff;
    }

    .x-tree-item-editor-item {
        display: block;
        padding: 2px 35px 2px 15px;
    }

    .x-tree-item-editor-item:hover {
        background: #E9EBEE;
    }

    .x-tree-item-children {
        padding-left: 1.5em;
    }

    .padding-left-0 {
        padding-left: 0;
    }
</style>