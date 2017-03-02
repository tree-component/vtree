<template>
    <div class="x-tree-wrapper">
        <x-tree-item class="x-tree-root" :model="model" :options="options" :fn="fn" ref="treeItem"></x-tree-item>
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
            var treeTemp = Fn._arrayToTree(this.data);

            var treeChecked = Fn._checkTreeByIds(treeTemp, this.options.sel_ids);

            return {
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
