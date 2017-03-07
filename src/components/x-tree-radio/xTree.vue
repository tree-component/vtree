<template>
    <div class="x-tree-wrapper">
        <x-tree-item class="x-tree-root" :model="model" :options="opt" :fn="fn"></x-tree-item>
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
            var opt = Fn._mergeOptions(this.options);

            var treeTemp = Fn._arrayToTree(this.data, opt);

            var treeChecked = Fn._checkTreeByIds(treeTemp, opt.sel_ids);

            return {
                opt: opt,
                fn: Fn,
                model: treeChecked
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
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
</style>
