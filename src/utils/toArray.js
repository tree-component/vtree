import isString from './isString';
import isArray from './isArray';

function toArray(params) {
  let array = [];
  if (isString(params)) {
    array = params.split(',');
  } else if (isArray(params)) {
    array = params;
  } else {
    console.warn('请检查 参数 格式');
  }
  return array;
}

export default toArray;
