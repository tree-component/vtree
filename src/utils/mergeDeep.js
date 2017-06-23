import mergeDeepBase from './mergeDeepBase';

function mergeDeep() {
  let target = arguments[0] || {};
  for (let i = 1; i < arguments.length; i++) {
    target = mergeDeepBase(target, arguments[i]);
  }
  return target;
}

export default mergeDeep;
