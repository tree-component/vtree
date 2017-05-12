function toArray(params) {
  let array = [];
  if (params.constructor === String) {
    array = params.split(',');
  } else if (params.constructor === Array) {
    array = params;
  } else {
    console.warn('请检查 参数 格式');
  }
  return array;
}

export default toArray;
