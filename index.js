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
app.httpServer.listen(process.env.PORT || 80, () => {
  console.log(`HTTP : Listening to port ${process.env.PORT || 80}`);
});

/*
// checks if key and certificate has been set for https
if (typeof(config.httpsOptions) === 'undefined')
  return;

//https setup and initialization
app.httpsServer = https.createServer(config.httpsOptions, (req, res) => {
  ajaxServer(req, res);
});

app.httpsServer.listen(config.httpsPort, () => {
  console.log(`HTTPS : Listening to port ${config.httpsPort}`);
});
*/