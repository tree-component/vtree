<template>
  <div class="x-tree-wrapper">
    <x-tree-item class="x-tree-root" :class="" :style="" :model="dataTree" :tree="dataTree" :options="opts" :fn="fnfn" @click.stop=""></x-tree-item>
  </div>
</template>

<script>
import merge from '../utils/merge';
import mergeDeep from '../utils/mergeDeep';
import utils from '../utils/utils';
import Fn from './methods';
import xTreeItem from './xTreeItem.vue';

export default {
  name: 'x-tree',
  components: {
    xTreeItem,
  },
  props: {
    data: Array,
    options: Object,
    fn: Object,
  },
  data: function () {
    this.opts = Fn._initOptions(this.options);
    this.tree = Fn._arrayToTree(this.data, this.opts);
    this.tree = this.initTree(this.tree, this.opts);
    this.exportFn();
    return {
      dataTree: this.tree,
      opts: this.opts,
      fnfn: Fn,
    };
  },
  computed: {},
  methods: {
    initTree: function (tree, options) {
      const treeChecked = options.sel_ids ? Fn._checkTreeByIds(tree, options.sel_ids) : tree;
      const treeExpand = options.expandIds ? Fn._expandTreeByIds(treeChecked, options.expandIds) : treeChecked;

      if (options.expandIds) {
        const ids = utils.toArray(options.expandIds);
        const items = Fn.getItemByIds(tree, ids);
        for (let i = 0; i < items.length; i++) {
          this.activeItem(items[i]);
        }
      }
      return treeExpand;
    },
    exportFn: function () {
      // merge(this.fn, Fn);
      this.fn.getItems = this.getItems;
      this.fn.getIds = this.getIds;
      this.fn.getNames = this.getNames;
      this.fn.getItemById = this.getItemById;
      this.fn.locateItem = this.locateItem;
      this.fn.locateItems = this.locateItems;
      this.fn.activeItem = this.activeItem;
      this.fn.clearActive = this.clearActive;
      this.fn.setCustom = this.setCustom;
      this.fn.setTextIcon = this.setTextIcon;
    },
    getItems: function (type) {
      return Fn.getItems(this.tree, type)
    },
    getIds: function (type) {
      return Fn.getIds(this.tree, type)
    },
    getNames: function (type) {
      return Fn.getNames(this.tree, type)
    },
    getItemById: function (id) {
      const item = Fn.getItemById(this.tree, id);
      if (!item) {
        console.warn('没有找到对应的item');
        return;
      }
      return item;
    },
    activeItem: function (item) {
      item.class = this.opts.class.active;
      this.tree.active.push(item);
    },
    clearActive: function (type, id) {
      const array = this.tree.active;
      if (type) {
        for (let index = 0; index < array.length; index++) {
          array[index].class = '';
        }
        array.length = 0;
      } else {
        for (let index = 0; index < array.length; index++) {
          if (array[index].id == id) {
            array[index].class = '';
            array.splice();
            break;
          }
        }
      }
      return;
    },
    locateItem: function (id) {
      const item = Fn.getItemById(this.tree, id);
      if (!item) {
        console.warn('没有找到对应的item');
        return;
      }
      item.expand = true;
      Fn._expandParent(item.parent, true);
      this.activeItem(item)
      return item;
    },
    locateItems: function (ids) {
      const tree = Fn._expandTreeByIds(this.tree, ids);
      return tree;
    },
    setCustom: function (id, custom) {
      const item = this.getItemById(id);
      if (item) {
        item.custom = custom;
      } else {
        console.warn('未找到item, 请检查id是否正确');
      }
      return item;
    },
    setTextIcon: function (id, textIcon) {
      const item = this.getItemById(id);
      if (item) {
        item.textIcon = textIcon;
      } else {
        console.warn('未找到item, 请检查id是否正确');
      }
      return item;
    },
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
