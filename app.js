"use strict";

let express = require('express');
let app = express();
let http = require('http').Server(app);
let path = require('path');
let logger = require('morgan');
let bodyParser = require('body-parser');
let data = require('./data.json');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
  res.sendFile('index.html');
});

app.get('/data', function(req, res){
  res.send(data);
});

http.listen(8080, function(){
 console.log('listening on localhost:8080');
});
