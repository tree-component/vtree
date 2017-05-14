import isUndefined from './isUndefined';
import isNull from './isNull';
import isString from './isString';
import isArray from './isArray';
import isFunction from './isFunction';
import isArguments from './isArguments';
import isPrototype from './isPrototype';

const hasOwnProperty = Object.prototype.hasOwnProperty;

function isEmpty(value) {
  if (isUndefined(value) || isNull(value)) {
    return true;
  }
  if (isFunction(value)) {
    return false;
  }
  if (isArray(value) || isString(value) || isArguments(value)) {
    return !value.length;
  }
  if (isPrototype(value)) {
    return !Object.keys(value).length;
  }
  for (const key in value) {
    if (hasOwnProperty.call(value, key)) {
      return false;
    }
  }
  return true;
}

export default isEmpty;
