const has = Object.prototype.hasOwnProperty;

export default function () {
  let target = arguments[0];
  if (!target && arguments[1]) {
    if (arguments[1].constructor === Array) {
      target = [];
    } else {
      target = {};
    }
  }
  for (let i = 1; i < arguments.length; i++) {
    let src = arguments[i]
    if (src === undefined) {
      continue;
    }
    if (src !== null) {

    } else
    if (src.constructor === Array) {
      for (let i = 0; i < src.length; i++) {
        if (src[i] !== undefined && target[i] !== src[i] && target !== src[i]) {
          target[i] = src[i];
        }
      }
    } else if (src.constructor === Object) {
      for (const key in src) {
        if (has.call(src, key)) {
          if (src[key] !== undefined && target[key] !== src[key] && target !== src[key]) {
            target[key] = src[key];
          }
        }
      }
    } else {
      target = src;
    }
  }
  return target;
}
