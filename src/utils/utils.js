import isString from './isString';
import isArray from './isArray';

const utils = {};
utils.toArray = function (params) {
  let array = [];
  if (isString(params)) {
    array = params.split(',');
  } else if (isArray(params)) {
    array = params;
  } else {
    console.warn('请检查 参数 格式');
  }
  return array;
};
utils._uniqueArray = function (arrayIn) {
  const ua = [];
  for (let i = 0; i < arrayIn.length; i++) {
    if (ua.indexOf(arrayIn[i]) === -1) {
      ua.push(arrayIn[i]);
    }
  }
  return ua;
};

export default utils;
