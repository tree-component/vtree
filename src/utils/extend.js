const extend = {};
extend.extend = function () {
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
    if (!src) {
      continue;
    }
    if (src.constructor === Array) {
      for (let i = 0; i < src.length; i++) {
        if (src[i] !== undefined && target[i] !== src[i] && target !== src[i]) {
          target[i] = src[i];
        }
      }
    } else if (src.constructor === Object) {
      for (const key in src) {
        if (src.hasOwnProperty(key)) {
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
};

extend.deepExtend = function () {
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
    if (!src) {
      continue;
    }
    if (src.constructor === Array) {
      for (let i = 0; i < src.length; i++) {
        if (src[i] !== undefined && target[i] !== src[i] && target !== src[i]) {
          if (src[i].constructor === Object || src[i].constructor === Array) {
            target[i] = extend.deepExtend(target[i], src[i]);
          } else {
            target[i] = src[i];
          }
        }
      }
    } else if (src.constructor === Object) {
      for (const key in src) {
        if (src.hasOwnProperty(key)) {
          if (src[key] !== undefined && target[key] !== src[key] && target !== src[key]) {
            if (src[key].constructor === Object || src[key].constructor === Array) {
              target[key] = extend.deepExtend(target[key], src[key]);
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
};

export default extend;

jQuery.extend = jQuery.fn.extend = function () {
  var options, name, src, copy, copyIsArray, clone,
    target = arguments[0] || {},
    i = 1,
    length = arguments.length,
    deep = false;

  // Handle a deep copy situation
  if (typeof target === "boolean") {
    deep = target;

    // Skip the boolean and the target
    target = arguments[i] || {};
    i++;
  }

  // Handle case when target is a string or something (possible in deep copy)
  if (typeof target !== "object" && !jQuery.isFunction(target)) {
    target = {};
  }

  // Extend jQuery itself if only one argument is passed
  if (i === length) {
    target = this;
    i--;
  }

  for (; i < length; i++) {

    // Only deal with non-null/undefined values
    if ((options = arguments[i]) != null) {

      // Extend the base object
      for (name in options) {
        src = target[name];
        copy = options[name];

        // Prevent never-ending loop
        if (target === copy) {
          continue;
        }

        // Recurse if we're merging plain objects or arrays
        if (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = Array.isArray(copy)))) {

          if (copyIsArray) {
            copyIsArray = false;
            clone = src && Array.isArray(src) ? src : [];

          } else {
            clone = src && jQuery.isPlainObject(src) ? src : {};
          }

          // Never move original objects, clone them
          target[name] = jQuery.extend(deep, clone, copy);

          // Don't bring in undefined values
        } else if (copy !== undefined) {
          target[name] = copy;
        }
      }
    }
  }

  // Return the modified object
  return target;
};
