# vtree

tree树形控件
目前主要对应公司的需求，正在努力改成普遍适用的tree。有些功能定制程度太高，后面会改用更通用的功能来实现。

## Installation

- [ ] npm安装
- [x] script标签引入

## Getting started

```JavaScript
var app = new Vue({
  el: '#app',
  data: function () {
    return {
      data: arrayData,
      options: treeOptions,
    };
  }
});
```

## features

- [x] 多选：选中/半选/取消
- [x] 多种多选
- [x] 默认展开
- [x] 默认选中
- [x] 编辑，增、删、改、排序
- [x] 自定义扩展内容
- [x] 异步加载
- [x] 回调：选中，展开，编辑，异步加载
- [x] 方法：获取当前选中，通过id查找节点、修改节点

## todos

- [ ] 单选
- [ ] 拖动排序
- [ ] 搜索/过滤
- [ ] 显示当前选中
- [ ] 全选/全不选
- [ ] 反选
- [ ] 全部折叠/展开
- [ ] 树标题/名字
- [ ] 空树时，显示

## License

MIT
