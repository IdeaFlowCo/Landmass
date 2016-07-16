const express = require('express');
const proxy = require('express-http-proxy');
const url = require('url');

const morgan = require('morgan');
const compression = require('compression')

const app = express();
const hostname = process.env.HOST_IP || '127.0.0.1'

app
  .use(compression())
  .use(morgan('combined'))
  .use('/api/v1/', proxy(hostname + ':3000', {
    forwardPath: function(req, res) {
      var path = url.parse(req.url).path;
      return path;
    },
    limit: '10mb'
  }))
  .use('/', proxy(hostname + ':8080', {
    forwardPath: function(req, res) {
      var path = url.parse(req.url).path;
      return /^\/src|jspm_packages|node_modules|build/.test(path) ? path : '/'
    },
    limit: '10mb'
  }))
  .listen(3003,'0.0.0.0');
