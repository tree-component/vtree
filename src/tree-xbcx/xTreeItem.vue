<template>
  <div class="x-tree-item" :class="model.is_node ? 'x-tree-node' : 'x-tree-leaf' ">
    <div class="x-tree-item-self" v-show="model.level" :class="[options.editable ? '' : 'editable_false', model.class]" :style="[{ 'padding-left': (model.level - 1) * 1.3 + 0.8 + 'em'}, options.style.item, model.style]" @mouseleave="hideEditorFn">
      <i class="x-tree-item-expand iconfont" v-if="hasChildren" :class="model.expand ? 'icon-1' : 'icon-1-copy'" @click.stop="expandFn"></i>
      <span class="icon-blank" v-else></span>
      <i class="x-tree-item-checkbox iconfont" v-show="options.checkbox" :class="checkboxIcon" @click.stop="checkFn"></i>
      <i class="x-tree-item-folder iconfont" :class="iconIcon" v-show="options.textIcon ? true : model.is_node"></i>
      <span class="x-tree-item-text" :title="model.name" @click.stop="nameFn">
        {{model.name}}
      </span>
      <i class="x-tree-item-edit iconfont icon-xiangxia11" v-if="menuIf" @click.stop="showEditorFn"></i>
      <div class="x-tree-item-editor" v-if="menuIf" v-show="showEditor">
        <div v-if="options.defaultMenu">
          <span class="x-tree-item-editor-item" v-show="model.is_edit" @click.stop="editFn">{{options.editorText.edit}}</span>
          <span class="x-tree-item-editor-item" v-show="model.is_delete" @click.stop="deleteFn">{{options.editorText.delete}}</span>
          <span class="x-tree-item-editor-item" v-show="model.is_add" @click.stop="addChildFn">{{options.editorText.add}}</span>
          <span class="x-tree-item-editor-item" v-show="sortable.upAble" @click.stop="sortFn(true)">{{options.editorText.up}}</span>
          <span class="x-tree-item-editor-item" v-show="sortable.downAble" @click.stop="sortFn(false)">{{options.editorText.down}}</span>
        </div>
        <span class="x-tree-item-editor-item" v-for="(item, index) in model.menu" @click.stop="menuFn(item.callback)">
          {{item.text}}
        </span>
      </div>
      <div class='x-tree-item-custom' v-show="model.level" v-html="model.custom" :style="options.style.custom">
      </div>
    </div>
    <div class='x-tree-item-children' v-if="hasChildren" v-show="model.expand" :style="options.style.children">
      <x-tree-item v-for="model in model.children" :model="model" :tree="tree" :options="options" :fn="fn">
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
    fn: Object,
    tree: Object,
  },
  data() {
    return {
      if: {

      },
      show: {

      },
      style: {

      },
      showEditor: false,
      state: {},
    };
  },
  created() {
    if (this.options.custom) {
      this.model.custom = this.options.custom(this.model);
    }
    if (this.options.menuCustom) {
      this.model.menu = this.options.menuCustom(this.model);
    }
  },
  computed: {
    expandIcon() {
      let faIcon = '';
      if (this.options.checkbox) {
        if (this.model.checkState === true) {
          faIcon = 'icon-square-check';
        } else if (this.model.checkState === false) {
          faIcon = 'icon-square';
        } else if (this.model.checkState === 'z') {
          faIcon = 'icon-square-minus';
        }
      }
      return faIcon;
    },
    checkboxIcon() {
      let faIcon = '';
      if (this.options.checkbox) {
        if (this.model.checkState === true) {
          faIcon = 'icon-square-check';
        } else if (this.model.checkState === false) {
          faIcon = 'icon-square';
        } else if (this.model.checkState === 'z') {
          faIcon = 'icon-square-minus';
        }
      }
      return faIcon;
    },
    iconIf() {

    },
    iconIcon() {
      let iconIcon = '';
      if (this.options.textIcon) {
        iconIcon = this.options.textIcon;
      } else if (this.model.is_node) {
        iconIcon = 'icon-wenjianjia1';
      }
      return iconIcon;
    },
    menuIf() {
      if (this.options.editable === false) {
        return false;
      }
      if (this.options.defaultMenu === false) {
        return this.model.menu.length !== 0;
      } else if (!this.model.is_edit && !this.model.is_delete && !this.model.is_add
        && !this.sortable.upAble && !this.sortable.downAble) {
        return this.model.menu.length !== 0;
      }
      return true;
    },
    index() {
      if (!this.model.parent) {
        return false;
      }
      return this.model.parent.children.indexOf(this.model);
    },
    hasChildren() {
      return this.model.is_node && this.model.children && this.model.children.length;
    },
    sortable() {
      if (!this.model.parent || this.model.parent.children.length == 1) {
        return {
          upAble: false,
          downAble: false,
        };
      }
      let upable = true;
      let downable = true;
      const index = this.model.parent.children.indexOf(this.model);
      const len = this.model.parent.children.length;
      if (index === 0) {
        upable = false;
      } else if (index >= len - 1) {
        downable = false;
      }
      return {
        upAble: upable,
        downAble: downable,
      };
    },
  },

  methods: {
    expandFn() {
      if (this.hasChildren) {
        this.model.expand = !this.model.expand;
        this.options.onExpand(this.model);
      }
    },
    checkFn() {
      this.fn._changeItem(this.model, !this.model.is_check);
      this.options.onCheck(this.model);
    },
    nameFn() {
      this.options.onClick(this.model);
    },
    nameFnn() {

    },
    showEditorFn() {
      this.showEditor = !this.showEditor;
    },
    hideEditorFn() {
      this.showEditor = false;
    },
    editFn() {
      this.options.onEdit(this.model, this.editFnn);
      this.showEditor = false;
    },
    editFnn(item, pid, result) {
      if (result && this.model.parent.id != pid) {
        const index = this.model.parent.children.indexOf(this.model);
        this.model.parent.children.splice(index, 1);
        const parent = this.fn.getItemById(this.tree, pid);
        if (!parent || !parent.is_node) {
          return 'error : 修改节点(change parent), 新的parent不合法(1、不存在 2、is_node为false 3、当前节点本身或其后代)';
        }
        parent.children.push(this.model);
      }
      return false;
    },
    menuFn(callback) {
      if (callback) {
        callback(this.model);
      }
      this.showEditor = false;
    },
    deleteFn() {
      this.options.onDelete(this.model, this.deleteFnn);
      this.showEditor = false;
    },
    deleteFnn(item, result) {
      const index = this.model.parent.children.indexOf(this.model);
      if (result) {
        this.model.parent.children.splice(index, 1);
      }
    },
    addChildFn() {
      const newChild = {
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
      this.options.onAddChild(newChild, this.addChildFnn);
      this.showEditor = false;
    },
    addChildFnn(item, result) {
      if (result) {
        item.parent.children.push(item);
      }
    },
    sortFn(type) {
      const index = this.model.parent.children.indexOf(this.model);
      let brother;
      if (type) {
        brother = this.model.parent.children[index - 1];
        this.options.onSort(this.model, brother, this.upFnn);
      } else {
        brother = this.model.parent.children[index + 1];
        this.options.onSort(this.model, brother, this.downFnn);
      }
      this.showEditor = false;
    },
    upFnn(item, result) {
      const index = this.model.parent.children.indexOf(this.model);
      if (result) {
        this.model.parent.children.splice(index, 1);
        this.model.parent.children.splice(index - 1, 0, this.model);
      }
    },
    downFnn(item, result) {
      const index = this.model.parent.children.indexOf(this.model);
      if (result) {
        this.model.parent.children.splice(index, 1);
        this.model.parent.children.splice(index + 1, 0, this.model);
      }
    },
  },
};

</script>

<style scoped>
.x-tree-item {
  position: relative;
  font-size: 14px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.x-tree-item-self {
  position: relative;
  padding: 0 2em 0 0.5em;
}

.x-tree-item-self:hover {
  background: #E9EBEE;
}

.iconfont {
  font-size: 14px;
  width: 14px;
  color: #999;
}

.icon-blank {
  display: inline-block;
  font-size: 14px;
  width: 1em;
}

.x-tree-item-expand {}

.x-tree-item-checkbox {}

.x-tree-item-text {
  display: inline-block;
  vertical-align: bottom;
  padding: 0 1em 0 0em;
  width: calc(100% - 40px);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.x-tree-item-text-tip {
  position: absolute;
  top: -20px;
  left: 0px;
  display: inline-block;
  padding: 0 15px;
  border: 1px solid #fff;
  background: #fff;
}

.x-tree-item-edit {
  display: none;
  position: absolute;
  top: 0.36em;
  right: 0.27em;
}

.x-tree-item-self:hover .x-tree-item-edit {
  display: block;
}

.x-tree-item-editor {
  display: block;
  position: absolute;
  right: 0;
  width: 120px;
  z-index: 99;
  box-shadow: 0 1px 4px #999;
  background: #fff;
}

.x-tree-item-editor-item {
  display: block;
  padding: 2px 35px 2px 15px;
}

.x-tree-item-editor-item:hover {
  background: #E9EBEE;
}

.x-tree-item-children {
  /*padding-left: 1.3em;*/
}

.editable_false {
  padding-right: 0;
}

.x-tree-node>.editable_false>.x-tree-item-text {
  padding: 0;
  width: calc(100% - 37px);
}

.x-tree-leaf>.editable_false>.x-tree-item-text {
  padding: 0;
  width: calc(100% - 20px);
}
</style>
