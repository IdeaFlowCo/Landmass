const express = require('express');
const proxy = require('express-http-proxy');
const url = require('url');
var morgan = require('morgan')

const app = express();

app
  .use(morgan('combined'))
  .use('/static/', proxy('127.0.0.1:8080', {
    forwardPath: function(req, res) {
      var path = url.parse(req.url).path;
      return '/static' + path;
    }
  }))
  .use('/api/v1/', proxy('127.0.0.1:9090', {
    forwardPath: function(req, res) {
      var path = url.parse(req.url).path;
      return path;
    }
  }))
  .listen(3003);
