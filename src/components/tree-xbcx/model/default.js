
const defOptions = {
    zIndex: 9,
    is_trigger: false, //是否需要触发? 否则直接显示
    has_search: false,
    only_child: false, //是否结果只要 child
    node_merge: false, //结果只显示最上层  比如   中国被选中  四川,成都则不会显示  否则 每个被勾选的节点都显示
    is_multi: true, //是否多选
    expand: false, //是否展开，false、true、num,(0、1、false,都展开一级。true,完全展开。num>=2时，展开到对应级）
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
            children: '',
            custom: '',
    },
    onExpand: function () {},
    onClick: function () {},

    onCheck: function () {},

    onEdit: function () {},

    onDelete: function () {},

    onAddChild: function () {},

    onSort: function () {},
};

export default defOptions;