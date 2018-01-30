const express = require('express');
var cheerio = require('cheerio');
const request = require('request');

const router = express.Router();


router.get('/', function(req, res, next) {
    request({
        method: 'GET',
        url: req.query.uri
    }, function(err, response, body) {
        if (err) return console.error(err);
    
        $ = cheerio.load(body);

        let title = $('meta[property="og:title"]').attr('content') || $("title").text();
        let description = $('meta[property="og:description"]').attr('content') || $('meta[name="description"]').attr('content');
        let icon =  $('link[rel=icon]').attr('href') || $('img').first().attr('src');

        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({ title: title, description: description, icon: icon}));
    });
});

module.exports = router;