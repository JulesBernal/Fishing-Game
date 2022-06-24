//import fs from "fs";

// import {Phaser} from 'phaser';
import fs from 'fs';
// const fs = require("fs");
const FISH_DATA = JSON.parse(fs.readFileSync("./fish.json"));

const MAX_VAL = 100,
  MIN_VAL = 0;
const canvas=document.getElementById("canvaGame");
const ctx = canvas.getContext("2d");
ctx.font="10px Arial";
//function to run probability from a Max value to a Min Value
//Accept a modifier, to change if the value is rounded using
//Math.floor, or toFixed to a value.
function mathFunc(mod = 0, max = MAX_VAL, min = MIN_VAL) {
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
  if (x < commonVal && x > MIN_VAL) {
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
  let fishClass = FISH_DATA[rarityRoll(mathFunc())];
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
  const fishWeight = mathFunc(
    2,
    rolledFish.fishMaxWeight,
    rolledFish.fishMinWeight
  );
  return `${secretString}You caught a ${fishColorWay} ${rolledFish.fishName}! 
It is ${fishLength} inches long and ${fishWeight} lbs!
${rolledFish.fishStory}`;
}
console.log(fishRNG());
// ctx.fillText(fishRNG(),200,200);

// ctx.fillText("cats",200,200);



const config = {
  width: 800,
  height: 600,
  type: Phaser.AUTO,
  audio: {
    disableWebAudio: true
  },
  physics: {
    default: 'arcade',
    arcade: {
      fps: 60,
      gravity: {y : 0},
    }
  },
};

const game = new Phaser.Game(config);
