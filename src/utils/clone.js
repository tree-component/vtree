import isArray from './isArray';
import isPlainObject from './isPlainObject';

const hasOwnProperty = Object.prototype.hasOwnProperty;

function clone(src) {
  let target;
  if (isArray(src)) {
    target = [];
    for (let i = 0; i < src.length; i++) {
      target[i] = src[i];
    }
    return target;
  }
  if (isPlainObject(src)) {
    target = {};
    for (const key in src) {
      if (hasOwnProperty.call(src, key)) {
        target[key] = src[key];
      }
    }
    return target;
  }
  target = src;
  return target;
}

export default clone;
