import getTag from './getTag';

function isArray(value) {
  return getTag(value) === '[object Array]';
}

export default isArray;
