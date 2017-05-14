import mergeBase from './mergeBase';

function merge() {
  let target = arguments[0] || {};
  for (let i = 1; i < arguments.length; i++) {
    target = mergeBase(target, arguments[i]);
  }
  return target;
}

export default merge;
