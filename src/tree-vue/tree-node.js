let idDefault = 0;
export default class Node {
  constructor(options) {
    this.key = options.key; //
    this.pkey = options.pkey;
    this.parent = options.parent;
    this.id = idDefault++;
    this.name = null;
    this.text = null;
    this.nodeId = null;
    this.data = null;
    this.is_check = false;
    this.checkState = false;

    this.is_node = false;
    this.expand = false;

    this.parentNode = null;
    this.childrenNode = [];

    // internal
    this.level = 0;
    this.loaded = false;
    this.children = [];
    this.loading = false;
    this.custom = null;
    this.class = null;
    this.style = null;

    for (const prop in options) {
      if (options.hasOwnProperty(prop)) {
        this[prop] = options[prop];
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
  }
}
