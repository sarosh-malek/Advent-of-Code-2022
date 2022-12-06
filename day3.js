import fs from 'fs';
import readline from 'readline';
const file = 'input.txt';

const rucksacks = [];
let ans = 0;
function calculatePriority(elements) {
  let setOne = new Set();
  let setTwo = new Set();
  for (let element of elements[0]) {
    setOne.add(element);
  }
  for (let element of elements.splice(1)) {
    for (let c of element) {
      if (setOne.has(c)) {
        setTwo.add(c);
      }
    }
    setOne = new Set([...setTwo]);
    setTwo.clear();
  }
  return setOne;
}

function charToNumber(c) {
  const num = c.charCodeAt(0);
  if (num >= 97) {
    return num - 96;
  } else {
    return num - 64 + 26;
  }
}

console.time('Elvs');
const stream = readline.createInterface({
  input: fs.createReadStream(file),
});

for await (const line of stream) {
  rucksacks.push(line);
}

for (let i = 0; i < rucksacks.length; i += 3) {
  const it = calculatePriority(rucksacks.slice(i, i + 3)).values();
  const elem = it.next().value;
  ans += charToNumber(elem);
}

console.timeEnd('Elvs');
