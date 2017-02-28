<template>
    <div class="x-tree-item">
        <div class="x-tree-item-item">
            <i v-if="hasChildren" class="fa" :class="model.expand ? 'fa-minus' : 'fa-plus'" @click="expandFn"></i>
            <span v-else class="icon-blank"></span>
            <i class="fa" :class="model.is_check ? 'fa-check-square-o' : 'fa-square-o'" @click="checkFn"></i>
            <span>{{model.name}}</span>
            <i class="fa" :class="!showEditor ? 'fa-caret-down' : 'fa-caret-up' " @click="editFn"></i>
            <div class="x-tree-item-editor" v-show="showEditor">
                <div class="x-tree-item-editor-item" @click="">修改部门</div>
                <div class="x-tree-item-editor-item" @click="deleteFn">删除部门</div>
                <div class="x-tree-item-editor-item" @click="">添加子部门</div>
            </div>
        </div>

        <div class='x-tree-item-children' v-if="hasChildren" v-show="model.expand">
            <x-tree-item class="x-tree-item" v-for="model in model.children" :model="model">
            </x-tree-item>
        </div>
    </div>
</template>

<script>
    export default {
        name : 'x-tree-item',
        props: {
            model: Object
        },
        data: function () {
            return {
                showEditor: false,
                newChild: {
                    id: '',
                    name: '',
                    is_node: '',
                    is_check: '',
                },
                idRE: /^(\w+|[\u4e00-\u9fa5]+)$/,
                nameRE: /^(\w+|[\u4e00-\u9fa5]+)$/,
                nodeRE: /^(\w+|[\u4e00-\u9fa5]+)$/,
                checkRE: /^(\w+|[\u4e00-\u9fa5]+)$/,
            };
        },
        computed: {
            hasChildren: function () {
                return this.model.is_node && this.model.children &&
                    this.model.children.length
            },
            validation: function () {
                return {
                    id: !!this.newChild.name.trim(),
                    name: !!this.newChild.name.trim(),
                    node: this.nodeRE.test(this.newChild.is_node),
                    check: this.checkRE.test(this.newChild.is_check),
                }
            },
            isValid: function () {
                var validation = this.validation;
                return Object.keys(validation).every(function (key) {
                    return validation[key]
                })
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
                if (this.hasChildren) {
                    this.model.expand = !this.model.expand;
                }
            },
            checkFn: function () {
                console.log("this",this);
                this._changeItem(this.model, !this.model.is_check);
            },

            editFn: function () {
                this.showEditor = !this.showEditor;
            },


            updateItemFn: function () {
                this.showEditor = !this.showEditor;
                this.model.id = this.newChild.id;
                this.model.name = this.newChild.name;
                this.model.is_node = this.newChild.is_node;
                this.model.is_check = this.newChild.is_check;
            },

            deleteFn: function () {
                var index = this.model.parent.children.indexOf(this.model);
                this.model.parent.children.splice(index ,1);
                this.showEditor = !this.showEditor;
            },

            newChildFn: function () {
                this.editOrAdd = false;
                this.showEditor = !this.showEditor;
            },

            addChildFn: function () {
                this.showEditor = !this.showEditor;
                var newChildTemp = {
                    id: this.newChild.id,
                    name: this.newChild.name,
                    nodeId: '',
                    is_node: this.newChild.is_node,
                    is_check: this.newChild.is_check,
                    expand: '',
                    level: '',
                    parent: '',
                    children: '',
                };
                this.model.children.push(newChildTemp);
            }
        }
    }
</script>