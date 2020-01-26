require('dotenv').config();
const bodyParser = require('body-parser');
const fs = require('fs');
const express = require('express');
const morgan = require('morgan');
const path = require('path');

const babelrc = fs.readFileSync('./.babelrc');
let babelConfig;
try {
  babelConfig = JSON.parse(babelrc);
} catch (err) {
  console.error('==> ERROR: Error parsing your .babelrc.');
  console.error(err);
}

require('@babel/polyfill');
require('@babel/register')(babelConfig);
require('@babel/core').transform('code', babelConfig);

const config = require('./config');
const Ssr = require('./middlewares/ssr');
const server = express();

if (config.env === 'development') {
  server.use(morgan('dev'));
  server.enable('trust proxy');
}

server.disable('x-powered-by');
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

server.use(express.static(path.resolve(__dirname, '../../dist')));

server.get('*', Ssr.render);

server.listen(config.port, () => {
  console.log(`Listening on: http://localhost:${config.port} env: ${config.env}`);
});
