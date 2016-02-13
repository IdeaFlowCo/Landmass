const express = require('express');
const proxy = require('express-http-proxy');
const url = require('url');

const morgan = require('morgan');
const compression = require('compression')

const app = express();

app
  .use(compression())
  .use(morgan('combined'))
  .use('/static/', proxy('127.0.0.1:8080', {
    forwardPath: function(req, res) {
      var path = url.parse(req.url).path;
      return '/static' + path;
    },
    limit: '10mb'
  }))
  .use('/api/v1/', proxy('127.0.0.1:9090', {
    forwardPath: function(req, res) {
      var path = url.parse(req.url).path;
      return path;
    },
    limit: '10mb'
  }))
  .listen(3003);
