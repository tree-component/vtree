const utils = {};
utils.toArray = function (params) {
    let array = [];
    if (params.constructor == String) {
        array = params.split(',');
    } else if (params.constructor == Array) {
        array = params;
    } else {
        console.warn('请检查 参数 格式');
    }
    return array;
}
utils._uniqueArray = function (arrayIn) {
    let ua = [];
    for (let i = 0; i < arrayIn.length; i++) {
        if (ua.indexOf(arrayIn[i]) == -1) {
            ua.push(arrayIn[i]);
        }
    }
    return ua;
}

export default utils;