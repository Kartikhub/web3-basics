function arrayToHex(byteArray) {
  let str = '';
  for(let i = 0; i < byteArray.length; i++) {
    str += byteArray[i].toString(16).padStart(2, '0');
  }
  return str;
}

const byteArray = new Uint8Array([72, 101, 108, 108, 111]);

const hexString = arrayToHex(byteArray);

console.log(hexString);
