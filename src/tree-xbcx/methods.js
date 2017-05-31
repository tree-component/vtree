import clone from '../utils/clone';
import cloneDeep from '../utils/cloneDeep';
import merge from '../utils/merge';
import mergeDeep from '../utils/mergeDeep';
import isString from '../utils/isString';
import isArray from '../utils/isArray';

function _initOptions(options) {
  const defOptions = {
    zIndex: 9,
    is_trigger: false, // 是否需要触发? 否则直接显示
    has_search: false,
    only_child: false, // 是否结果只要 child
    node_merge: false, // 结果只显示最上层  比如   中国被选中  四川,成都则不会显示  否则 每个被勾选的节点都显示
    is_multi: true, // 是否多选
    expand: false, // 是否展开，false、true、num,(0、1、false,都展开一级。true,完全展开。num>=2时，展开到对应级）
    expandIds: null,
    sel_ids: '',
    checkbox: false,
    editable: false,
    editorText: {
      edit: '修改部门',
      delete: '删除部门',
      add: '添加子部门',
      up: '上移',
      down: '下移',
      unable: '无法操作',
    },
    style: {
      tree: {
        width: null,
        maxHeight: 300,
      },
      item: {},
      children: {},
      custom: {
        position: 'absolute',
        top: '0',
        left: '0',
      },
    },
    class: {
      tree: '',
      item: '',
      active: 'x-tree-item-active',
      children: '',
      custom: '',
    },
    onExpand() {},
    onClick() {},
    onCheck() {},
    onEdit() {},
    onDelete() {},
    onAddChild() {},
    onSort() {},
  };
  if (options.style && options.style.tree && options.style.tree.width) {
    defOptions.style.custom.left = options.style.tree.width;
  }
  const opt = mergeDeep({}, defOptions, options);
  return opt;
}

function _traverseTree(tree, fn, input, output) {
  if (!tree) {
    return true;
  }
  const _continue = fn(tree, input, output); // 是否继续遍历
  if (_continue.children && tree.children) {
    for (let i = 0; i < tree.children.length; i++) {
      const brother = _traverseTree(tree.children[i], fn, input, output);
      if (!brother) {
        break;
      }
    }
  }
  return _continue.brother;
}


function _arrayToTree(arrayIn, opt) {
  const rootId = _getTreeRoot(arrayIn);
  const treeData = {
    id: rootId,
    name: 'ROOT',
    nodeId: null,
    is_node: true,
    is_check: false,
    children: [],
    parent: null,
    level: 0,
    expand: true,
    custom: null,
    menuCustom: null,
    menuCustomFn: null,
    active: [],
    options: opt,
    originData: arrayIn,
    itemAmount: arrayIn.length,
  };
  treeData.children = _getSubTree(arrayIn, treeData, opt);
  return treeData;
}

function _getTreeRoot(arrayIn) {
  let rootId = [];
  const copy = clone(arrayIn);
  for (let i = 0, len = arrayIn.length; i < len; i++) {
    for (let j = i; j < len; j++) {
      if (arrayIn[i].id == arrayIn[j].nodeId) {
        copy[j] = null;
      }
      if (arrayIn[i].nodeId == arrayIn[j].id) {
        copy[i] = null;
      }
    }
  }

  for (let k = 0; k < copy.length; k++) {
    if (copy[k]) {
      rootId.push(copy[k].nodeId);
    }
  }
  rootId = _uniqueArray(rootId);

  if (rootId.length > 1) {
    console.warn('warning: rootId不唯一', rootId);
  } else if (rootId.length <= 0) {
    console.warn('warning: 没有rootId', rootId);
  }

  return rootId[0];
}

function _uniqueArray(arrayIn) {
  const ua = [];
  for (let i = 0; i < arrayIn.length; i++) {
    if (ua.indexOf(arrayIn[i]) == -1) {
      ua.push(arrayIn[i]);
    }
  }
  return ua;
}

function _getSubTree(arrayIn, parent, opt) {
  const result = [];
  let temp = {};
  for (let i = 0; i < arrayIn.length; i++) {
    if (arrayIn[i].nodeId == parent.id) {
      temp = clone(arrayIn[i]);
      if (opt.checkbox && temp.is_check === undefined) {
        temp.is_check = false;
      }
      temp.parent = parent;
      temp.custom = null;
      temp.menuCustom = null;
      temp.menuCustomFn = null;
      temp.class = null;
      temp.style = null;
      temp.level = parent.level + 1;
      if (isString(opt.expandIds) || isArray(opt.expandIds)) {
        temp.expand = false;
      } else {
        temp.expand = expandLvl(opt.expand, temp);
      }
      temp.checkState = temp.is_check;
      if (temp.is_node) {
        temp.children = _getSubTree(arrayIn, temp, opt);
      } else {
        temp.children = [];
      }
      result.push(temp);
    }
  }
  return result;
}

function expandLvl(expand, temp) {
  if (expand === true) {
    return true;
  } else if (expand === false && temp.level <= 0) {
    return true;
  } else if (temp.level <= expand) {
    return true;
  }
  return false;
}

function _checkTreeByIds(tree, sel_ids) {
  let ids = [];
  if (isString(sel_ids)) {
    ids = sel_ids.split(',');
  } else if (isArray(sel_ids)) {
    ids = sel_ids;
  } else {
    console.warn('请检查 sel_ids 格式');
  }

  _traverseTree(tree, _checkTreeByIdsFn, ids);

  return tree;
}

function _checkTreeByIdsFn(item, ids) {
  if (!ids.length) {
    return {
      children: false,
      brother: false,
    };
  }
  for (let i = 0; i < ids.length; i++) {
    if (item.id == ids[i]) {
      _changeItem(item, true);
      ids.splice(i, 1);
      break;
    }
  }
  return {
    children: ids.length,
    brother: ids.length,
  };
}

function _expandTreeByIds(tree, expand_ids) {
  let ids = [];
  if (isString(expand_ids)) {
    ids = expand_ids.split(',');
  } else if (isArray(expand_ids)) {
    ids = expand_ids;
  } else {
    console.warn('请检查 expandIds 格式');
  }
  _traverseTree(tree, _expandTreeByIdsFn, ids);
  return tree;
}

function _expandTreeByIdsFn(item, ids) {
  if (!ids.length) {
    return {
      children: false,
      brother: false,
    };
  }
  for (let i = 0; i < ids.length; i++) {
    if (item.id == ids[i]) {
      _expandParent(item.parent, true);
      ids.splice(i, 1);
      break;
    }
  }
  return {
    children: ids.length,
    brother: ids.length,
  };
}

function _activeTreeByIds(tree, expand_ids) {
  let ids = [];
  if (isString(expand_ids)) {
    ids = expand_ids.split(',');
  } else if (isArray(expand_ids)) {
    ids = expand_ids;
  } else {
    console.warn('请检查 expandIds 格式');
  }
  _traverseTree(tree, _activeTreeByIdsFn, ids);
  return tree;
}

function _activeTreeByIdsFn(item, ids) {
  if (!ids.length) {
    return {
      children: false,
      brother: false,
    };
  }
  for (let i = 0; i < ids.length; i++) {
    if (item.id == ids[i]) {
      _expandParent(item.parent, true);
      ids.splice(i, 1);
      break;
    }
  }
  return {
    children: ids.length,
    brother: ids.length,
  };
}

function _changeItem(item, change) {
  if (!item) {
    return false;
  }
  item.is_check = change;
  item.checkState = change;
  if (item.children) {
    _changeChildren(item.children, change);
    _changeChildrenState(item.children, change);
  }
  if (item.parent) {
    _changeParent(item.parent, change);
    _changeParentState(item.parent, change);
  }
}

function _changeChildrenState(children, change) {
  if (!children) {
    return false;
  }
  for (let i = 0; i < children.length; i++) {
    children[i].checkState = change;
    if (children[i].children) {
      _changeChildrenState(children[i].children, change);
    }
  }
  return true;
}

function _changeChildren(children, change) {
  if (!children) {
    return false;
  }
  for (let i = 0; i < children.length; i++) {
    if (children[i].is_check !== change) {
      children[i].is_check = change;
      if (children[i].children) {
        _changeChildren(children[i].children, change);
      }
    }
  }
  return true;
}

function _changeParentState(parent, change) {
  if (!parent) {
    return false;
  }
  const old = parent.checkState;
  const len = parent.children.length;

  if (change === 'z') {
    parent.checkState = 'z';
  } else if (change === true) {
    let n = 0;
    for (let i = 0; i < len; i++) {
      if (parent.children[i].checkState === true) {
        n += 1;
      } else {
        parent.checkState = 'z';
        break;
      }
    }
    if (n === len) {
      parent.checkState = true;
    }
  } else if (change === false) {
    let m = 0;
    for (let j = 0; j < len; j++) {
      if (parent.children[j].checkState === false) {
        m += 1;
      } else {
        parent.checkState = 'z';
        break;
      }
    }
    if (m === len) {
      parent.checkState = false;
    }
  }

  if (parent.parent && parent.checkState !== old) {
    _changeParentState(parent.parent, parent.checkState);
  }
  return true;
}

function _changeParent(parent, change) {
  if (!parent || parent.is_check == change) {
    return false;
  }
  if (change) {
    for (let i = 0; i < parent.children.length; i++) {
      if (!parent.children[i].is_check) {
        return false;
      }
    }
  }
  parent.is_check = change;
  if (parent.parent) {
    _changeParent(parent.parent, change);
  }
  return true;
}

function _expandParent(parent, expand) {
  parent.expand = expand;
  if (parent.parent) {
    _expandParent(parent.parent, expand);
  }
  return true;
}

function getItemById(tree, id) {
  if (!tree || id == undefined || id == null) {
    return false;
  }
  if (tree.id == id) {
    return tree;
  }
  if (tree.children && tree.children.length) {
    for (let i = 0; i < tree.children.length; i++) {
      const item = getItemById(tree.children[i], id);
      if (item) {
        return item;
      }
    }
  }
  return false;
}

function getItemByIds(tree, ids) {
  if (!tree || !ids || !ids.length) {
    return false;
  }
  let result = [];
  for (let i = 0; i < ids.length; i++) {
    if (tree.id == ids[i]) {
      result.push(tree);
      ids.splice(i, 1);
    }
  }
  if (ids.length && tree.children && tree.children.length) {
    for (let i = 0; i < tree.children.length; i++) {
      const result2 = getItemByIds(tree.children[i], ids);
      result = result.concat(result2);
      if (!ids.length) {
        break;
      }
    }
  }
  return result;
}

// item:Object,key:String,value:Array,fn:Function
function changeItemKeyValue(item, key, value) {
  if (!item || !key) {
    return false;
  }
  const temp = item;
  temp[key] = value;
  return true;
}

function getCheckedItems(tree) {
  if (!tree) {
    return false;
  }
  let result = [];
  if (tree.is_check === true) {
    result.push(tree);
  }
  if (tree.children && tree.children.length) {
    for (let i = 0; i < tree.children.length; i++) {
      const result2 = getCheckedItems(tree.children[i]);
      result = result.concat(result2);
    }
  }
  return result;
}


function getItems(tree, typeIn) {
  if (!tree) {
    return false;
  }
  // 0、根据this.options
  // 'all'、全部；
  // 'merge'、合并到节点；
  // 'leaf'、仅叶子；
  // 'node'、仅节点；
  let type;
  const leaf = [];
  const node = [];
  const data = getCheckedItems(tree);

  if (!typeIn) {
    type = 1;
  } else {
    type = typeIn;
  }

  switch (type) {
    case 'node': // 仅节点
      data.forEach((n) => {
        if (n.is_check === true && n.is_node === true) {
          node.push(n);
        }
      }, this);
      break;

    case 'leaf': // 仅叶子
      data.forEach((n) => {
        if (n.is_check === true && n.is_node === false) {
          leaf.push(n);
        }
      }, this);
      break;

    case 'merge': // 合并到节点
      const nodeIds = [];
      data.forEach((n) => {
        if (n.is_check === true && n.is_node === true && n.level !== 0) { // 不要包括root节点
          nodeIds.push(n.id);
        }
      }, this);
      // 节点合并
      const copy = []; // 直接赋值传的是引用
      for (let index = 0; index < data.length; index++) {
        copy[index] = clone(data[index]);
      }
      // 去除相应子节点
      for (let index = 0; index < copy.length; index++) {
        // 父节点checked，自身未被checked，自身是root节点
        if ((nodeIds.indexOf(copy[index].nodeId) != -1) || !copy[index].is_check || copy[index].level === 0) {
          copy[index] = null;
        }
      }
      copy.forEach((n) => {
        if (n && n.is_node === true) {
          node.push(n);
        } else if (n && n.is_node === false) {
          leaf.push(n);
        }
      }, this);
      break;
    case 'all':
    default: // 全部
      data.forEach((n) => {
        if (n.is_check === true && n.is_node === true) {
          node.push(n);
        } else if (n.is_check === true && n.is_node === false) {
          leaf.push(n);
        }
      }, this);
      break;
  }

  return {
    node,
    leaf,
  };
}

function getIds(tree, type) {
  const ids = {};
  const items = getItems(tree, type);

  for (const key in items) {
    ids[key] = [];
    if (items.hasOwnProperty(key) && items[key].length > 0) {
      items[key].forEach((element) => {
        ids[key].push(element.id);
      }, this);
    }
  }

  return ids;
}

function getNames(tree, type) {
  const names = {};
  const items = getItems(tree, type);

  for (const key in items) {
    names[key] = [];
    if (items.hasOwnProperty(key) && items[key].length > 0) {
      items[key].forEach((element) => {
        names[key].push(element.name);
      }, this);
    }
  }
  return names;
}


function getItem(tree) {
  const data = getItems(tree);
  _traverseTree(model, getNameFn, name);
  return name;
}

function getId(model) {
  const name = [];
  _traverseTree(model, getNameFn, name);
  return name;
}

function getName(model) {
  const name = [];
  _traverseTree(model, getNameFn, name);
  return name;
}

const fn = {
  _initOptions,

  _arrayToTree,
  _getTreeRoot,
  _uniqueArray,
  _getSubTree,

  _checkTreeByIds,
  _checkTreeByIdsFn,

  _expandTreeByIds,
  _expandTreeByIdsFn,
  _expandParent,

  _activeTreeByIds,
  _activeTreeByIdsFn,

  _traverseTree,

  _changeItem,
  _changeChildren,
  _changeParent,

  getItemById,
  getItemByIds,

  getItems,
  getIds,
  getNames,
  getItem,
  getId,
  getName,
};

export default fn;
