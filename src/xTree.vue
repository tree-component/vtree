<template>
    <div class="x-tree-wrapper">
        <x-tree-item class="x-tree-root" :model="model" :options="options" :fn="fn"></x-tree-item>
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

            var treeTemp = Fn._arrayToTree(this.data);

            var treeChecked = Fn._checkTreeByIds(treeTemp, opt.sel_ids);

            return {
                options: opt,
                fn: Fn,
                model: treeChecked
            };
        },
        computed: {},
        methods: {}
    };
</script>

<style scoped>

</style>
