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
// app.use(express.static(path.join(__dirname, "public")));
app.get('/', function (req, res) {
  res.sendFile(__dirname + "/index.html");
});
app.listen(3000, () => {
  console.log("Server listening on localhost:4000");
});
