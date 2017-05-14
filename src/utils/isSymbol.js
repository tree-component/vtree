import getTag from './getTag';

function isSymbol(value) {
  return getTag(value) === '[object Symbol]';
}

export default isSymbol;
