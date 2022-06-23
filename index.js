#!/usr/bin/env node
const app = require("yargs")
const server = require("./lib/app")

const http = require('http')
const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World! NodeJS \n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

app
  .scriptName("iptv-id")
  .command(
    "start [port] [domain]",
    "Start service",
    (yargs) => {
      return yargs.positional("port", {
        type: "number",
        default: 3000,
      })
    },
    ({ port, domain }) => {
      if (domain) server.domain(domain)
      server.listen(port, () => {
        console.log(`Server Start at port ${port}`)
        console.log(
          "URL Playlist:",
          `${domain || `http://localhost:${port}`}/playlist.m3u`
        )
      })
    }
  )
  .help().argv

module.exports = server
