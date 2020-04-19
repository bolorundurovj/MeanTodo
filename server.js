const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const index = require("./routes/index");
const tasks = require("./routes/tasks");

var app = express();

//View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view-engine', 'ejs');
app.engine('html', require('ejs').renderFile);

//Set static folder
app.use(express.static(path.join(__dirname, 'client')));

//BodyParser MiddleWare

