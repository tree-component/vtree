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
                let treeChecked = Fn._checkTreeByIds(treeTree, options.sel_ids);
                let treeExpand;
                if(options.expandIds){
                    treeExpand = Fn._expandTreeByIds(treeChecked, options.expandIds);
                }else{
                    treeExpand = treeChecked;
                }
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
                this.fn.setCustom = this.setCustom;
            },
            getItemById : function (id){
                var item = Fn.getItemById(this.tree,id);
                return item;
            },
            locateItem : function (id){
                var item = Fn.getItemById(this.tree,id);
                item.expand = true;
                item.class = this.opt.class.active
                Fn._expandParent(item.parent,true);
                return item;
            },
            locateItems : function (ids){
                Fn._expandTreeByIds(this.tree, ids);
                return item;
            },
            setCustom :function (id,custom){
                var item = this.getItemById(id);
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
