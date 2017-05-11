
let idDefault = 0;
export default class Node {
  constructor(options) {
    this.id = idDefault++;
    this.name = null;
    this.nodeId = null;
    this.data = null;
    this.is_check = false;
    this.checkState = false;

    this.is_node = false;
    this.expand = false;

    this.parent = null;
    this.children = [];

    // internal
    this.level = 0;
    this.loaded = false;
    this.children = [];
    this.loading = false;
    this.custom = null;
    this.class = null;
    this.style = null;

    for (let name in options) {
      if (options.hasOwnProperty(name)) {
        this[name] = options[name];
      }
    }

    if (this.parent) {
      this.level = this.parent.level + 1;
    }

    const store = this.store;
    if (!store) {
      throw new Error('[Node]store is required!');
    }
    store.registerNode(this);

    const props = store.props;
    if (props && typeof props.isLeaf !== 'undefined') {
      const isLeaf = getPropertyFromData(this, 'isLeaf');
      if (typeof isLeaf === 'boolean') {
        this.isLeafByUser = isLeaf;
      }
    }

    if (store.lazy !== true && this.data) {
      this.setData(this.data);

      if (store.defaultExpandAll) {
        this.expanded = true;
      }
    } else if (this.level > 0 && store.lazy && store.defaultExpandAll) {
      this.expand();
    }

    if (!this.data) return;
    const defaultExpandedKeys = store.defaultExpandedKeys;
    const key = store.key;
    if (key && defaultExpandedKeys && defaultExpandedKeys.indexOf(this.key) !== -1) {
      this.expand(null, store.autoExpandParent);
    }

    if (key && store.currentNodeKey && this.key === store.currentNodeKey) {
      store.currentNode = this;
    }

    if (store.lazy) {
      store._initDefaultCheckedNode(this);
    }

    this.updateLeafState();
  }
}