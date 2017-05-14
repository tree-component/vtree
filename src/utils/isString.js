import getTag from './getTag';

function isString(value) {
  return getTag(value) === '[object String]';
}

export default isString;
