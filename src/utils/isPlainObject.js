import getTag from './getTag';

function isPlainObject(value) {
  if (getTag(value) !== '[object Object]') {
    return false;
  }
  const proto = Object.getPrototypeOf(value);
  if (proto === null) {
    return true;
  }
  return false;
}

export default isPlainObject;
