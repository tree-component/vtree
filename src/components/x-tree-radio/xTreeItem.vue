<template>
    <div class="x-tree-item">
        <div class="x-tree-item-body" v-show="model.level">
            <i class="x-tree-item-expand fa" v-if="hasChildren" :class="model.expand ? 'fa-caret-down' : 'fa-caret-right'"  @click="expandFn"></i>
            <span class="icon-blank" v-else></span>
            <i class="x-tree-item-checkbox fa" :class="options.checkbox ? checkboxIcon :'fa-folder-o' " @click="checkFn"></i>
            <span class="x-tree-item-name" @click="nameFn">{{model.name}}</span>
            <i class="x-tree-item-list fa fa-caret-square-o-down" @click="showEditorFn"></i>
            <div class="x-tree-item-editor" v-show="showEditor">
                <span class="x-tree-item-editor-item" v-show="model.is_edit" @click="editFn">修改部门</span>
                <span class="x-tree-item-editor-item" v-show="model.is_delete" @click="deleteFn">删除部门</span>
                <span class="x-tree-item-editor-item" v-show="model.is_add" @click="addChildFn">添加子部门</span>
                <span class="x-tree-item-editor-item" v-show="model.is_add" @click="addChildFn">上移</span>
                <span class="x-tree-item-editor-item" v-show="model.is_add" @click="addChildFn">下移</span>
                <span class="x-tree-item-editor-item" v-show="cantEdit">无法操作</span>
            </div>
        </div>
        <div class='x-tree-item-children' v-if="hasChildren" v-show="model.expand">
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
            cantEdit : function () {
                return !this.model.is_edit && !this.model.is_delete && !this.model.is_add;
            }
        },
        methods: {
            expandFn: function () {
                if (this.hasChildren) {
                    this.model.expand = !this.model.expand;
                }
            },
            checkFn: function () {
                this.fn._changeItem(this.model, !this.model.is_check);
            },

            nameFn: function () {
                console.log("this",this);
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
                    children: [],
                };
                this.options.onAddChild(newChild);
                this.showEditor = !this.showEditor;
            }
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

    .x-tree-item-body {
        padding: 0 2em 0 1.5em;
        line-height: 2em;
    }

    .x-tree-item-body:hover {
        background:#E9EBEE;
    }

    .fa {
        font-size: 16px;
        width: 16px;
        color: #999;
    }

    .icon-blank {
        display: inline-block;
        font-size: 16px;
        width: 1em;
    }

    .fa {
    }

    .x-tree-item-expand {

    }

    .x-tree-item-checkbox {

    }

    .x-tree-item-name {
        padding: 0 0.5em;
    }

    .x-tree-item-list {
        display: none;
        position: absolute;
        top: 0.27em;
        right: 0.27em;
    }

    .x-tree-item-body:hover .x-tree-item-list{
        display: block;
    }

    .x-tree-item-editor {
        display: block;
        position: absolute;
        right: 0;
        z-index: 99;
        font-size: 14px;
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
        line-height: 1.5em;
    }

</style>