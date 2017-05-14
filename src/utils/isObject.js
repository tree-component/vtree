import getTag from './getTag';

function isObject(value) {
  return getTag(value) === '[object Object]';
}

export default isObject;
