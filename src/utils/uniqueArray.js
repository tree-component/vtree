function uniqueArray(arrayIn) {
  const ua = [];
  for (let i = 0; i < arrayIn.length; i++) {
    if (ua.indexOf(arrayIn[i]) === -1) {
      ua.push(arrayIn[i]);
    }
  }
  return ua;
}

export default uniqueArray;
