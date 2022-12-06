import fs from 'fs';
import readline from 'readline';
const file = 'input.txt';

const stream = readline.createInterface({
  input: fs.createReadStream(file),
});

for await (let line of stream) {
  const charCount = Array(27).fill(0);
  for (let i = 0; i < 14; i++) {
    const index = line.charCodeAt(i) - 96;
    charCount[index]++;
  }
  if (!findDuplicates(charCount)) {
    console.log(14);
  } else {
    let l = 1;
    let r = 14;
    while (r < line.length) {
      charCount[line.charCodeAt(l - 1) - 96]--;
      charCount[line.charCodeAt(r) - 96]++;
      if (!findDuplicates(charCount)) {
        console.log(r + 1);
        break;
      }
      l++;
      r++;
    }
  }
}

function findDuplicates(charCount) {
  return charCount.some((num) => num >= 2);
}
