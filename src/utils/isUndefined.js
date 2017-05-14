import getTag from './getTag';

function isUndefined(value) {
  return getTag(value) === '[object Undefined]';
}

export default isUndefined;
