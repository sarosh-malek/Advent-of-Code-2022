import fs from 'fs';
import readline from 'readline';
const file = 'input.txt';
let rucksacks = [];

const stream = readline.createInterface({
  input: fs.createReadStream(file),
});

for await (const line of stream) {
  const input = line
    .split(',')
    .map((pair) => pair.split('-').map((num) => parseInt(num)));
  rucksacks.push(input);
}

console.log(solve(rucksacks));

function isOverlap(arr) {
  if (arr[0][0] == arr[1][0] || arr[0][1] == arr[1][1]) {
    return true;
  }
  if (arr[0][0] > arr[1][0]) {
    console.log(arr, arr[1][1] >= arr[0][1]);
    return arr[1][1] >= arr[0][0];
  } else if (arr[0][0] < arr[1][0]) {
    console.log(arr, arr[0][1] >= arr[1][1]);
    return arr[1][0] <= arr[0][1];
  }
}

function solve(rucksacks) {
  let ans = 0;
  for (const ruck of rucksacks) {
    if (isOverlap(ruck)) {
      ans++;
    }
  }
  return ans;
}
