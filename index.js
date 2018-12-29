/*
 *
 * @Date 29 Dec 2018
 * @Author: Ameya S. Daddikar
 * Description: The entry point for the Hello API Assignment
*/


let http   = require('http');
let https  = require('https');
let config = require('./config/');
let ajaxServer = require('./src/ajaxServer');


let app = {};

// http server setup
app.httpServer = http.createServer((req, res)=> {
  ajaxServer(req, res);
});

// initialize http
app.httpServer.listen(config.httpPort, () => {
  console.log(`HTTP : Listening to port ${config.httpPort}`);
});

// TODO add https support
