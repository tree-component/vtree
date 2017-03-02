<template>
    <div class="x-tree-item">
        <div class="x-tree-item-self" v-show="model.level">
            <i class="x-tree-item-expand fa" :class="model.expand ? 'fa-minus' : 'fa-plus'" v-show="hasChildren"
               @click="expandFn"></i>
            <span class="icon-blank" v-show="!hasChildren"></span>
            <i class="x-tree-item-checkbox fa" :class=checkboxIcon
               @click="checkFn"></i>
            <span class="x-tree-item-name" @click="nameFn">{{model.name}}</span>
            <span @mouseleave="hideEditorFn">
                <i class="x-tree-item-list fa" :class="!showEditor ? 'fa-caret-down' : 'fa-caret-up' "
                   @click="showEditorFn"></i>
                <span class="x-tree-item-editor" v-show="showEditor">
                    <span class="x-tree-item-editor-item" @click="editFn">修改部门</span>
                    <span class="x-tree-item-editor-item" @click="deleteFn">删除部门</span>
                    <span class="x-tree-item-editor-item" @click="addChildFn">添加子部门</span>
                </span>
            </span>

        </div>

        <div class='x-tree-item-children' v-if="hasChildren" v-show="model.expand">
            <x-tree-item v-for="model in model.children" :model="model" :options="treeOptions" :fn="fn">
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
                treeOptions: this.options,
                showEditor: false,
            };
        },
        computed: {
            hasChildren: function () {
                return this.model.is_node && this.model.children &&
                    this.model.children.length
            },
            checkboxIcon: function () {
                var state = '';

                if(this.model.is_check === true){
                    return 'fa-check-square-o';
                }


                var len = this.model.children.length;
                var m = 0;
                var n = 0;

                for (var i = 0; i < len; i++) {
                    if (this.model.children[i].is_check === true) {
                        m += 1;
                    } else if (this.model.children[i].is_check === false) {
                        n += 1;
                    }
                }

                if (m == len) {
                    state = 'fa-check-square-o';
                } else if (n == len) {
                    state = 'fa-square-o';
                } else {
                    state = 'fa-minus-square-o';
                }
                return state;
            }
        },
        methods: {

            expandFn: function () {
                console.log(this.model.expand);
                if (this.hasChildren) {
                    this.model.expand = !this.model.expand;
                }
                console.log(this.model.expand);
            },
            checkFn: function () {
                this.fn._changeItem(this.model, !this.model.is_check);
            },

            nameFn: function () {
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