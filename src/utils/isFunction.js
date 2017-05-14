import getTag from './getTag';

function isFunction(value) {
  return getTag(value) === '[object Function]';
}

export default isFunction;
