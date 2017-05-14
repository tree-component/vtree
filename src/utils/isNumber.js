import getTag from './getTag';

function isNumber(value) {
  return getTag(value) === '[object Number]';
}

export default isNumber;
