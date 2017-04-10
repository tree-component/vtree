<template>
    <div class="x-tree-wrapper">
        <x-tree-item class="x-tree-root" :model="tree" :tree="tree" :options="opt" :fn="fn"></x-tree-item>
    </div>
</template>

<script>
    import Fn from './methods'
    import xTreeItem from './xTreeItem.vue';

    export default {
        name: "x-tree",
        components: {
            xTreeItem
        },
        props: {
            data: Array,
            options: Object
        },
        data: function () {
            let opt = Fn._initOptions(this.options);

            let treeTree = Fn._arrayToTree(this.data, opt);

            let treeChecked = Fn._checkTreeByIds(treeTree, opt.sel_ids);

            let treeExpand;

            if(opt.expandIds){
                treeExpand = Fn._expandTreeByIds(treeChecked,opt.expandIds);
            }else{
                treeExpand = treeChecked;
            }

            return {
                fn: Fn,
                opt: opt,
                tree: treeExpand
            };
        },
        computed: {},
        methods: {}
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
