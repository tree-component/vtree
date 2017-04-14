<template>
    <div class="x-tree-wrapper">
        <x-tree-item class="x-tree-root" :class="" :style="" :model="tree" :tree="tree" :options="opt" :fn="fnfn" @click.stop=""></x-tree-item>
    </div>
</template>

<script>
    import extend from '../../utils/extend.js';
    import Fn from './methods.js';
    import xTreeItem from './xTreeItem.vue';

    export default {
        name: "x-tree",
        components: {
            xTreeItem
        },
        props: {
            data: Array,
            options: Object,
            fn: Object
        },
        data: function () {
            this.exportFn();
            let treeOptions = this.initOptions(this.options);
            let treeData = this.initData(this.data,this.options);
            return {
                fnfn: Fn,
                opt: treeOptions,
                tree: treeData
            };
        },
        computed: {},
        methods: {
            initData : function (data,options){
                let treeTree = Fn._arrayToTree(data, options);
                let treeChecked = options.sel_ids ? Fn._checkTreeByIds(treeTree, options.sel_ids) : treeTree;
                let treeExpand = options.expandIds ? Fn._expandTreeByIds(treeChecked, options.expandIds) : treeChecked;
                return treeExpand;
            },
            initOptions : function (options){
                let opt = Fn._initOptions(options);
                return opt;
            },
            exportFn : function (){
                extend.extend(this.fn,Fn);
                this.fn.getItemById = this.getItemById;
                this.fn.locateItem = this.locateItem;
                this.fn.locateItems = this.locateItems;
                this.fn.activeItem = this.activeItem;
                this.fn.clearActive = this.clearActive;
                this.fn.setCustom = this.setCustom;
            },
            getItemById : function (id){
                let item = Fn.getItemById(this.tree,id);
                if(!item){
                    console.warn('没有找到对应的item');
                    return;
                }
                return item;
            },
            activeItem : function (item) {
                item.class = this.opt.class.active;
                this.tree.active.push(item);
            },
            clearActive : function (type,id) {
                let array = this.tree.active;
                if(type){
                    for (var index = 0; index < array.length; index++) {
                        array[index].class = '';
                    }
                    array.length = 0;
                } else {
                    for (var index = 0; index < array.length; index++) {
                        if(array[index].id == id){
                            array[index].class = '';
                            array.splice();
                            break;
                        }
                    }
                }
                return;
            },
            locateItem : function (id){
                let item = Fn.getItemById(this.tree,id);
                if(!item){
                    console.warn('没有找到对应的item');
                    return;
                }
                item.expand = true;
                Fn._expandParent(item.parent,true);
                this.activeItem(item)
                return item;
            },
            locateItems : function (ids){
                let tree = Fn._expandTreeByIds(this.tree, ids);
                return tree;
            },
            setCustom :function (id,custom){
                let item = this.getItemById(id);
                if(item){
                    item.custom = custom;
                }else{
                    console.warn('未找到item, 请检查id是否正确');
                }
                return item;
            }

        }
    };
</script>

<style scoped>
    .x-tree-wrapper {
        position: relative;
        cursor: pointer;
        font-size: 1em;
        line-height: 1.8em;
        white-space: nowrap;
    }
</style>
