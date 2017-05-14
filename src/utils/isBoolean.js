import getTag from './getTag';

function isBoolean(value) {
  return getTag(value) === '[object Boolean]';
}

export default isBoolean;
