import getTag from './getTag';

function isPlainObject(value) {
  return getTag(value) === '[object Object]';
}

export default isPlainObject;
