const fs = require("fs");
var fishData = JSON.parse(fs.readFileSync("./fish.json"));

const MAXVAL = 100,
  MINVAL = 0;

//function to run probability from a Max value to a Min Value
//Accept a modifier, to change if the value is rounded using
//Math.floor, or toFixed to a value.
function mathFunc(mod = 0, max = MAXVAL, min = MINVAL) {
  if (max > 0 && mod == "round") {
    return Math.floor(Math.random() * (max - min) + min);
  } else if (max > 0 && typeof max == "number" && mod != 2) {
    return Math.random() * (max - min) + min;
  } else if (max > 0 && typeof max == "number" && mod == 2) {
    return (Math.random() * (max - min) + min).toFixed(mod);
  } else {
    return max;
  }
}
function rarityRoll(x) {
  const commonVal = 50,
    rare = 80,
    epic = 95,
    secretRare = 98;
  if (x < commonVal && x > MINVAL) {
    return "common";
  } else if (commonVal < x && x < rare) {
    return "rare";
  } else if (rare < x && x < epic) {
    return "epic";
  } else {
    return "void";
  }
}
function color(rolledFish) {
  if (mathFunc() >= 93) {
    return [
      rolledFish.fishColor[rolledFish.fishColor.length - 1],
      "secretRare",
    ];
  }
  return rolledFish.fishColor[
    mathFunc("round", rolledFish.fishColor.length - 1)
  ];
}
function fishRNG() {
  let fishClass = fishData[rarityRoll(mathFunc())];
  const rolledFish = fishClass[mathFunc("round", fishClass.length - 1)]; //rolls specific fish
  //   const fishColorWay= rolledFish.fishColor[mathFunc('round',(rolledFish.fishColor.length)-1)]; //rolls color of fish
  const fishColorFnc = color(rolledFish);
  let secretString = "";
  if (fishColorFnc[1] == "secretRare") {
    var fishColorWay = fishColorFnc[0];
    secretString = `Wow! You caught a secret rare!\n`;
  } else {
    var fishColorWay = fishColorFnc;
  }
  const fishLength = mathFunc(
    2,
    rolledFish.fishMaxLength,
    rolledFish.fishMinLength
  );
  return `${secretString}You caught a ${fishColorWay} ${rolledFish.fishName}! 
It is ${fishLength} inches long!
${rolledFish.fishStory}`;
}

console.log(fishRNG());
