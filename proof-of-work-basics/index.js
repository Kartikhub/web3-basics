const crypto = require("crypto");

let input = 0;
while(true) {
  let inputString = `
harkirat => Raman | Rs 100
Ram => Ankit | Rs 10
` + input.toString();
  let hash = crypto.createHash('sha256').update(inputString).digest('hex');
  if(hash.startsWith('00000')) {
    break;
  }
  input++;
}
console.log(input)
