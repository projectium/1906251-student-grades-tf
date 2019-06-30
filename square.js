// npm install @tensorflow/tfjs-node
// node square.js < input.txt

var readline = require("readline");
var tf = require("@tensorflow/tfjs-node");

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

const grades = {};
rl.on("line", function(line) {
  let [name, grade] = line.split(" ");
  grade = parseFloat(grade);
  if (name in grades) grades[name].push(grade);
  else grades[name] = [grade];
});

rl.on("close", function() {
  for (const name in grades) {
    grades[name] = tf.tensor1d(grades[name]);
  }

  for (const name in grades) {
    console.log(`${name} ${grades[name].mean().dataSync()}`);
  }
});
