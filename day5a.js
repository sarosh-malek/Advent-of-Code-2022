import fs from 'fs';
import readline from 'readline';
const file = 'input.txt';
let crates = [];
let queries = [];
let query = false;

const stream = readline.createInterface({
  input: fs.createReadStream(file),
});

for await (const line of stream) {
  if (line === '') {
    query = true;
    continue;
  }
  if (query) {
    const num = line.match(/\d+/g).map((d) => parseInt(d));
    queries.push(num);
  } else {
    let l = line.split();
    crates.push(l[0].split(''));
  }
}

formateCrates();

function processQuery(stack) {
  let result = '';
  queries.forEach((q) => {
    const move = q[0];
    const from = q[1];
    const to = q[2];
    const removed = stack[from - 1].splice(stack[from - 1].length - move);
    stack[to - 1].push(...removed.reverse());
  });
  stack.forEach((e) => (result += e[e.length - 1]));
  console.log(result);
}

function formateCrates() {
  let stack = [];
  const last = crates[crates.length - 1];
  for (let numberIndex = 0; numberIndex < last.length; numberIndex++) {
    if (last[numberIndex] != ' ') {
      let temp = [];
      for (let i = crates.length - 2; i >= 0; i--) {
        let ele = crates[i][numberIndex];
        if (ele === ' ') {
          break;
        }
        temp.push(ele);
      }
      stack.push(temp);
      temp = [];
    }
  }
  processQuery(stack);
}
