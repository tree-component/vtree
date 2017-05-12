const has = Object.prototype.hasOwnProperty;

function mergeDeep () {
  let target = arguments[0];
  if (!target && arguments[1]) {
    if (arguments[1].constructor === Array) {
      target = [];
    } else {
      target = {};
    }
  }
  for (let i = 1; i < arguments.length; i++) {
    let src = arguments[i];
    if (!src) {
      continue;
    }
    if (src.constructor === Array) {
      for (let index = 0; index < src.length; index++) {
        if (src[index] !== undefined && target[index] !== src[index] && target !== src[index]) {
          if (typeof src[index] === 'object') {
            target[index] = mergeDeep(target[index], src[index]);
          } else {
            target[index] = src[index];
          }
        }
      }
    } else if (src.constructor === Object) {
      for (const key in src) {
        if (has.call(src, key)) {
          if (src[key] !== undefined && target[key] !== src[key] && target !== src[key]) {
            if (src[key].constructor === Object || src[key].constructor === Array) {
              target[key] = mergeDeep(target[key], src[key]);
            } else {
              target[key] = src[key];
            }
          }
        }
      }
    } else {
      target = src;
    }
  }
  return target;
}

export default mergeDeep;
