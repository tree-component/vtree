<template>
    <div class="x-tree-item">
        <div class="x-tree-item-self" v-show="model.level">
            <i class="x-tree-item-expand fa" :class="model.expand ? 'fa-minus' : 'fa-plus'" v-show="hasChildren"
               @click="expandFn"></i>
            <span class="icon-blank" v-show="!hasChildren"></span>
            <i class="x-tree-item-checkbox fa" v-if="options.checkbox" :class=checkboxIcon @click="checkFn"></i>
            <span class="x-tree-item-name" @click="nameFn">{{model.name}}</span>
            <i class="x-tree-item-list fa" :class="!showEditor ? 'fa-caret-down' : 'fa-caret-up' "
               @click="showEditorFn"></i>
            <span class="x-tree-item-editor" v-show="showEditor" @mouseleave="hideEditorFn">
                <span class="x-tree-item-editor-item" v-show="model.is_edit" @click="editFn">修改部门</span>
                <span class="x-tree-item-editor-item" v-show="model.is_delete" @click="deleteFn">删除部门</span>
                <span class="x-tree-item-editor-item" v-show="model.is_add" @click="addChildFn">添加子部门</span>
                <span class="x-tree-item-editor-item" v-show="cantEdit">无法操作</span>
            </span>
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