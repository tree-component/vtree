const extend = {};
extend.extend = function (out) {
  out = out || {};

  for (let i = 1; i < arguments.length; i++) {
    if (!arguments[i]) {
      continue;
    }
    if (arguments[i].constructor === Array) {
      for (let index = 0; index < arguments[i].length; index++) {
        out[index] = arguments[i][index];
      }
    } else {
      for (const key in arguments[i]) {
        if (arguments[i].hasOwnProperty(key)) {
          out[key] = arguments[i][key];
        }
      }
    }

  }

  return out;
};

extend.deepExtend = function (out) {
  out = out || {};

  for (let i = 1; i < arguments.length; i++) {
    const obj = arguments[i];

    if (!obj) {
      continue;
    }

    // if (obj.constructor === Array) {
    //   for (let index = 0; index < obj.length; index++) {
    //     if (typeof obj[index] === 'object') {
    //       out[index] = extend.deepExtend(out[index], obj[index]);
    //     } else {
    //       out[index] = obj[index];
    //     }
    //   }
    // } else {
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          if (typeof obj[key] === 'object') {
            out[key] = extend.deepExtend(out[key], obj[key]);
          } else {
            out[key] = obj[key];
          }
        }
      }
    // }
  }

  return out;
};

export default extend;
