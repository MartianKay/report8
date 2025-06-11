var express = require('express');
var router = express.Router();
var request = require('request');


router.get('/', function(req, res, next) {
  require('dotenv').config();

const apiKey = process.env.NASA_API_KEY;
const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=1`;
  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var data = JSON.parse(body);
      const item = data[0];
      res.render('api', {
        title: item.title,
        image: item.url,
        explanation: item.explanation
      });
    } else {
      res.status(500).send("NASA API Error");
    }
  });
});

module.exports = router;