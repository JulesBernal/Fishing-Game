// import pkg from "express";
const express = require('express');
const app = express();
// import http from "http";
// import fs from "fs";
// import path from "path";
// import { fileURLToPath } from "url";
// import browserify from "browserify";


const PORT = process.env.PORT || 3000;


// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// app.use(express.static(__dirname+'/public'));
// app.use("/styles",  express.static(__dirname + '/public/stylesheets'));
// app.use("/scripts", express.static(__dirname + '/public/javascripts'));
// app.use("/images",  express.static(__dirname + '/public/images'));
// app.use(express.static(path.join(__dirname, "public")));
app.get('/*', function (req, res) {
  const game = require ('./public/app.js')
  console.log(game.fishRNG());
  res.send(game.fishRNG())
  // res.sendFile(__dirname + "/index.html");
});
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
