import getTag from './getTag';

function isNull(value) {
  return getTag(value) === '[object Null]';
}

export default isNull;

