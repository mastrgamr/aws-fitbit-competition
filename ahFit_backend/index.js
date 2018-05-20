'use strict'

const express = require('express')
const app = express()
const path = require('path');
const bodyParser = require('body-parser');

let db = require('./data/db.json');

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
  console.log(db)
  res.send({"status" : "OK"})
})

app.get('/eventData', function (req, res) {
  var lat = req.query.lat || 0.0;
  var lon = req.query.lon || 0.0;
  var steps = req.query.steps || 0;
  console.log('TODO: do something with this req.body: ', steps)
  res.send({
    "status" : 200,
    "steps": steps
  })
})

app.get('/events', function (req, res) {
  const result = {
    "events": [
      {
        "name": "Adidas 5K",
        "description": "Compete in this event to win $1,000 worth of Ethereum. Along with a pair of Limited Edition Yeezy Boost 350 v2 Zebra Stripe Edition!",
        "start_date": "2018-05-19T15:12:17.000",
        "end_date": "2018-05-26T15:12:17.000",
        "admission_fee": 30,
        "current_pool_amount": 1000,
        "participants": []
      },
      {
        "name": "J.P. Morgan Swim Freestyle",
        "description": "Compete to be the fastest swimmer in this freestyle swimming event!",
        "start_date": "2018-05-24T15:12:17.000",
        "end_date": "2018-05-31T15:12:17.000",
        "admission_fee": 50,
        "current_pool_amount": 5000,
        "participants": []
      },
      {
        "name": "Tour De NYC, B",
        "description": "Do you got what it takes to lap around Manhattan on your Bicycle? Sign up here, and we checkin fax, B.",
        "start_date": "2018-05-24T15:12:17.000",
        "end_date": "2018-05-31T15:12:17.000",
        "admission_fee": 25,
        "current_pool_amount": 1500,
        "participants": []
      }
    ]
  }
  res.send(result)
})

app.listen(4040, function () {
  console.log('App listening on port 4040!')
})
