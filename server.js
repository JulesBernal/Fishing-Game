import pkg from "express";
const express = pkg;
const app = express();
import http from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(__dirname+'/public'));
app.use("/styles",  express.static(__dirname + '/public/stylesheets'));
app.use("/scripts", express.static(__dirname + '/public/javascripts'));
app.use("/images",  express.static(__dirname + '/public/images'));
// app.use(express.static(path.join(__dirname, "public")));
app.get('/game', function (req, res) {
  res.sendFile(__dirname + "/index.html");
});
app.listen(4000, () => {
  console.log("Server listening on localhost:4000");
});
