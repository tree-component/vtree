<template>
    <div class="x-tree-wrapper">
        <x-tree-item class="x-tree-root" :model="tree" :tree="tree" :options="opt" :fn="fnfn" @click.stop=""></x-tree-item>
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
            let opt = Fn._initOptions(this.options);
            let treeTree = Fn._arrayToTree(this.data, opt);
            let treeChecked = Fn._checkTreeByIds(treeTree, opt.sel_ids);
            let treeExpand;
            if(opt.expandIds){
                treeExpand = Fn._expandTreeByIds(treeChecked, opt.expandIds);
            }else{
                treeExpand = treeChecked;
            }
            return {
                fnfn: Fn,
                opt: opt,
                tree: treeExpand
            };
        },
        computed: {},
        methods: {
            exportFn : function (){
                extend.extend(this.fn,Fn);
                this.fn.getItemById = this.getItemById;
                this.fn.setCustom = this.setCustom;
            },
            getItemById : function (id){
                var item;
                var data = this.data;
                for (var index = 0; index < data.length; index++) {
                     if (data[index].id == id) {
                        item = data[index];
                        break;
                     }
                }
                return item;
            },
            setCustom :function (id,custom){
                var item = this.getItemById(id);
                if(item){
                    item.custom = custom;
                }else{
                    console.warn('未找到item, 请检查id是否正确');
                }
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
