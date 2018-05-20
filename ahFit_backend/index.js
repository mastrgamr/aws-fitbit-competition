'use strict'

const express = require('express')
const app = express()
const path = require('path');
var bodyParser = require('body-parser');

// Bypass CORS -- https://enable-cors.org/server_expressjs.html
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
// app.use(express.static('public'))

// The root endpoint strictly to ping the server to see if online
app.get('/', function (req, res) {
  console.log('req: ', req.query.name)
  
  res.send({"status" : "OK"})
})

app.post('/eventData', function (req, res) {
  var geo = req.body.geo;
  console.log('TODO: do something with this req.body: ', req.body)
})

app.listen(3000, function () {
  console.log('App listening on port 3000!')
})

curl -i -X "{"geo":}" http://localhost:3000/eventData