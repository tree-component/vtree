<template>
    <div class="x-tree-item">
        <div class="x-tree-item-self" v-show="model.level">
            <i class="fa" :class="model.expand ? 'fa-minus' : 'fa-plus'" v-show="model.is_node" @click="expandFn"></i>
            <span class="icon-blank" v-show="!model.is_node"></span>
            <i class="fa" :class="model.is_check ? 'fa-check-square-o' : 'fa-square-o'" @click="checkFn"></i>
            <span @click="nameFn">{{model.name}}</span>
            <i class="fa" :class="!showEditor ? 'fa-caret-down' : 'fa-caret-up' " @click="editorFn"></i>
            <div class="x-tree-item-editor" v-show="showEditor">
                <div class="x-tree-item-editor-item" @click="editFn">修改部门</div>
                <div class="x-tree-item-editor-item" @click="deleteFn">删除部门</div>
                <div class="x-tree-item-editor-item" @click="addChildFn">添加子部门</div>
            </div>
        </div>

        <div class='x-tree-item-children' v-if="model.is_node" v-show="model.expand">
            <x-tree-item v-for="model in model.children" :model="model" :options="treeOptions">
            </x-tree-item>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'x-tree-item',
        props: {
            model: Object,
            options: Object
        },
        data: function () {
            return {
                treeOptions: this.options,
                showEditor: false,
            };
        },
        computed: {
            hasChildren: function () {
                return this.model.is_node && this.model.children &&
                    this.model.children.length
            }
        },
        methods: {
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

            expandFn: function () {
                console.log(this.model.expand);
                if(this.model.is_node){
                    this.model.expand = !this.model.expand;
                }
                console.log(this.model.expand);
            },
            checkFn: function () {
                this._changeItem(this.model, !this.model.is_check);
            },

            nameFn: function () {
                this.options.onName(this.model);
            },

            editorFn: function () {
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