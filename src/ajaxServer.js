/*
 * @Date 29 Dec 2018
 * @Author: Ameya S. Daddikar
 * @Description: A common server object that will be used for HTTP and HTTPS protocols
 * 
*/

const url = require('url');
const stringDecoder = require('string_decoder').StringDecoder;
const handler = require('./ajaxHandler');

// helper fumction to ajaxServer: Returns an object comprising all request parameters of HTTP/HTTPS
function getRequestedParams(req) {

  const parsedUrl = url.parse(req.url, true);

  // path
  const reqPath = parsedUrl.pathname.replace(/^\/+|\/$/g, '');

  // http method
  const method = req.method.toLowerCase();

  // query String
  const query = parsedUrl.query;

  // http header
  const headers = req.headers;

  return {
    path: reqPath,
    method,
    query,
    headers
  };

}

// The common AJAX server object for HTTP and HTTPS
const ajaxServer = function (req, res) {
  
  // uses utility function to get request params
  let reqParams = getRequestedParams(req);

  // buffer to load the incoming request payload
  let payload_buffer = '';

  const decoder = new stringDecoder('utf8');

  req.on('data', (data) => {
    // appending incoming data to payload
    payload_buffer += decoder.write(data);
  });

  req.on('end', (data) => {
    // add the payload_buffer to reqParams
    reqParams.payload = payload_buffer;

    // pass on the handling of request to the handler
    handler.handle(reqParams, res);
  });

};

module.exports = ajaxServer;