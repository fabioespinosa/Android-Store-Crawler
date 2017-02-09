var request = require('request');
var cheerio = require('cheerio');
var express = require('express');
var cors = require('cors');
const morgan = require('morgan');

const routes = require('./routes');

let port = 7070;
let app = express();

app.use(morgan('dev'));
app.use(cors());


routes(app);

app.listen(port, () => {
  console.log('Started in port '+ port);
})
