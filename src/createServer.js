/* eslint-disable no-console */
'use strict';

const http = require('node:http');

function createServer() {
  const server = http.createServer((req, res) => {
    let result = {};
    let reqUrl = '';

    try {
      reqUrl = new URL(req.url, 'http://localhost:5701');
    } catch (err) {
      console.error({ message: 'Invalid request URL' });
    }

    const parts = reqUrl.pathname.split('/').filter((item) => item !== '');
    const query = Object.fromEntries(reqUrl.searchParams.entries());

    result = { parts, query };

    console.log(JSON.stringify(result));

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(result));
  });

  return server;
}

module.exports = {
  createServer,
};
