import getTag from './getTag';

function isArguments(value) {
  return getTag(value) === '[object Arguments]';
}

export default isArguments;
