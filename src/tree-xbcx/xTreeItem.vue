<template>
  <div class="x-tree-item" :class="itemClass">
    <div class="x-tree-item-self" v-show="selfShow" :class="selfClass" :style="selfStyle" @mouseleave="menuHideFn">
      <i class="x-tree-item-expand iconfont" v-if="expandIf" :class="expandClass" @click.stop="expandFn"></i>
      <span class="icon-blank" v-else></span>
      <i class="x-tree-item-checkbox iconfont" v-show="checkboxShow" :class="checkboxClass" @click.stop="checkFn"></i>
      <i class="x-tree-item-icon iconfont" v-show="iconShow" :class="iconClass"></i>
      <span class="x-tree-item-text" :title="model.name" @click.stop="nameFn">
        {{model.name}}
      </span>
      <i class="x-tree-item-menu-dropdown iconfont icon-xiangxia11" v-if="dropdownIf" @click.stop="menuShowFn"></i>
      <div class="x-tree-item-menu" v-if="menuIf" v-show="menuShow">
        <div v-show="defaultMenuShow">
          <span class="x-tree-item-menu-item" v-show="model.is_edit" @click.stop="editFn">{{options.editorText.edit}}</span>
          <span class="x-tree-item-menu-item" v-show="model.is_delete" @click.stop="deleteFn">{{options.editorText.delete}}</span>
          <span class="x-tree-item-menu-item" v-show="model.is_add" @click.stop="addChildFn">{{options.editorText.add}}</span>
          <span class="x-tree-item-menu-item" v-show="sortable.upAble" @click.stop="sortFn(true)">{{options.editorText.up}}</span>
          <span class="x-tree-item-menu-item" v-show="sortable.downAble" @click.stop="sortFn(false)">{{options.editorText.down}}</span>
        </div>
        <div>
          <span class="x-tree-item-menu-item" v-for="(item, index) in model.menu" @click.stop="menuFn(item.callback)">
            {{item.text}}
          </span>
        </div>
      </div>
      <div class='x-tree-item-addition x-tree-item-custom' v-if="additionIf" :style="additionStyle" v-html="model.addition">
      </div>
    </div>
    <div class='x-tree-item-children' v-if="childrenIf" v-show="childrenShow" :class="" :style="childrenStyle">
      <x-tree-item v-for="child in model.children" :model="child" :tree="tree" :options="options" :fn="fn">
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
      text: this.model.name,
      title: this.model.name,
      showMenu: false,
    };
  },
  created() {
    if (this.options.custom) {
      this.model.addition = this.options.custom(this.model);
    }
    if (this.options.menuCustom) {
      this.model.menu = this.options.menuCustom(this.model);
    }
    if (this.options.textIcon) {
      this.model.textIcon = this.options.textIcon(this.model);
    }
  },
  computed: {
    itemIf() {
      return true;
    },
    itemShow() {
      return true;
    },
    itemClass() {
      return this.model.is_node ? 'x-tree-node' : 'x-tree-leaf';
    },
    itemStyle() {
      return '';
    },
    selfIf() {
      return true;
    },
    selfShow() {
      return this.model.level;
    },
    selfClass() {
      return [this.options.editable ? '' : 'editable_false', this.model.class];
    },
    selfStyle() {
      const paddingLeft = (this.model.level * 1.3) - 0.5;
      return [{ 'padding-left': `${paddingLeft}em` }, this.options.style.item, this.model.style];
    },
    expandIf() {
      return this.childrenIf;
    },
    expandShow() {
      return true;
    },
    expandClass() {
      return this.childrenShow ? 'icon-1' : 'icon-1-copy';
    },
    expandStyle() {
      return '';
    },
    checkboxIf() {
      return true;
    },
    checkboxShow() {
      return this.options.checkbox;
    },
    checkboxClass() {
      let faIcon = '';
      if (this.model.checkState === true) {
        faIcon = 'icon-square-check';
      } else if (this.model.checkState === false) {
        faIcon = 'icon-square';
      } else if (this.model.checkState === 'z') {
        faIcon = 'icon-square-minus';
      }
      return faIcon;
    },
    checkboxStyle() {
      return '';
    },
    iconIf() {
      return true;
    },
    iconShow() {
      return this.options.textIcon ? true : this.model.is_node;
    },
    iconClass() {
      let iconIcon = '';
      if (this.model.textIcon) {
        iconIcon = this.model.textIcon;
      } else if (this.model.is_node) {
        iconIcon = 'icon-wenjianjia1';
      }
      return iconIcon;
    },
    iconStyle() {
      return '';
    },
    textIf() {
      return true;
    },
    textShow() {
      return true;
    },
    textClass() {
      return true;
    },
    textStyle() {
      return true;
    },
    dropdownIf() {
      return this.menuIf;
    },
    dropdownShow() {
      return true;
    },
    dropdownClass() {
      return '';
    },
    dropdownStyle() {
      return '';
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
    menuShow() {
      return this.showMenu;
    },
    menuClass() {
      return '';
    },
    menuStyle() {
      return '';
    },
    defaultMenuIf() {
      return true;
    },
    defaultMenuShow() {
      return this.options.defaultMenu;
    },
    defaultMenuClass() {
      return '';
    },
    defaultMenuStyle() {
      return '';
    },
    customMenuIf() {
      return true;
    },
    customMenuShow() {
      return true;
    },
    customMenuClass() {
      return '';
    },
    customMenuStyle() {
      return '';
    },
    additionIf() {
      return this.model.addition;
    },
    additionShow() {
      return this.model.level;
    },
    additionClass() {
      return '';
    },
    additionStyle() {
      return this.options.style.custom;
    },
    childrenIf() {
      return this.model.is_node && this.model.children && this.model.children.length;
    },
    childrenShow() {
      return this.model.expand;
    },
    childrenClass() {
      return '';
    },
    childrenStyle() {
      return this.options.style.children;
    },

    index() {
      if (!this.model.parent) {
        return false;
      }
      return this.model.parent.children.indexOf(this.model);
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
      if (this.childrenIf) {
        this.model.expand = !this.model.expand;
        this.options.onExpand(this.model);
      }
    },
    checkFn() {
      this.fn.changeItem(this.model, !this.model.is_check);
      this.options.onCheck(this.model);
    },
    nameFn() {
      this.options.onClick(this.model);
    },
    nameFnn() {

    },
    menuShowFn() {
      this.showMenu = !this.showMenu;
    },
    menuHideFn() {
      this.showMenu = false;
    },
    editFn() {
      this.options.onEdit(this.model, this.editFnn);
      this.showMenu = false;
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
      this.showMenu = false;
    },
    deleteFn() {
      this.options.onDelete(this.model, this.deleteFnn);
      this.showMenu = false;
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
      this.showMenu = false;
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
      this.showMenu = false;
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
  color: #666;
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

.x-tree-item-menu-dropdown {
  display: none;
  position: absolute;
  top: 0.36em;
  right: 0.27em;
}

.x-tree-item-self:hover .x-tree-item-menu-dropdown {
  display: block;
}

.x-tree-item-menu {
  display: block;
  position: absolute;
  right: 0;
  width: 120px;
  z-index: 99;
  box-shadow: 0 1px 4px #999;
  background: #fff;
}

.x-tree-item-menu-item {
  display: block;
  padding: 2px 35px 2px 15px;
}

.x-tree-item-menu-item:hover {
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
