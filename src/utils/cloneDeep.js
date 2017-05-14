import isArray from './isArray';
import isPlainObject from './isPlainObject';

const hasOwnProperty = Object.prototype.hasOwnProperty;

function cloneDeep(src) {
  let target;
  if (isArray(src)) {
    target = [];
    for (let index = 0; index < src.length; index++) {
      if (target[index] !== src[index] && target !== src[index]) {
        target[index] = cloneDeep(src[index]);
      }
    }
    return target;
  }
  if (isPlainObject(src)) {
    target = {};
    for (const key in src) {
      if (hasOwnProperty.call(src, key) && target[key] !== src[key] && target !== src[key]) {
        target[key] = cloneDeep(src[key]);
      }
    }
    return target;
  }
  target = src;
  return target;
}

export default cloneDeep;
