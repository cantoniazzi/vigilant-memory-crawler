const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");

const indexRoute = require('./routes/index.js');
const crawlerRoute = require('./routes/crawlerRoute.js');

var port = process.env.PORT || 8080;

// routes
app.use('/', indexRoute);
app.use('/get-page-info', crawlerRoute);

app.listen(port, function() {
    console.log('Listening on port 8080!');
});