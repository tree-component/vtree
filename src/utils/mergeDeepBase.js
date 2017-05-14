import isUndefined from './isUndefined';
import isArray from './isArray';
import isPlainObject from './isPlainObject';

const hasOwnProperty = Object.prototype.hasOwnProperty;

function mergeDeepBase(target, src) {
  if (target === src) {
    return target;
  }
  let result = target;
  if (isArray(src)) {
    if (!isArray(result)) {
      result = [];
    }
    for (let i = 0; i < src.length; i++) {
      if (!isUndefined(src[i]) && result[i] !== src[i] && result !== src[i]) {
        result[i] = mergeDeepBase(result[i], src[i]);
      }
    }
    return result;
  }
  if (isPlainObject(src)) {
    if (!isPlainObject(result)) {
      result = [];
    }
    for (const key in src) {
      if (hasOwnProperty.call(src, key) && !isUndefined(src[key]) && result[key] !== src[key] && result !== src[key]) {
        result[key] = mergeDeepBase(result[key], src[key]);
      }
    }
    return result;
  }
  if (!isUndefined(src)) {
    result = src;
  }
  return result;
}

export default mergeDeepBase;
