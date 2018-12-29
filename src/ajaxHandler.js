/*
 * @Date 29 Dec 2018
 * @Author: Ameya S. Daddikar
 * @Description: A handler object used by the ajaxServer for handling RESTFul API requests
 * 
*/


// helper function: used by all paths to generate their HTTP/HTTPS response
const callback = function (statusCode = 500, payload = {}, res) {

  const responseString = JSON.stringify(payload);

  res.setHeader('Content-Type', 'application/json');
  res.writeHead(statusCode);
  res.end(responseString);

}

let ajaxHandler = {
  paths : {},
};

// /hello path handler
ajaxHandler.paths['hello'] = (data, res) => {
  callback(200, {response : 'Hello'}, res);
}

ajaxHandler.paths[''] = (data, res) => {
  let myInfo = {
    name  : 'Ameya Daddikar',
    alias : 'coldball',
    country: 'India',
    curr_employment: 'student'
  };
  callback(200, myInfo, res);
}

// 404 handler
ajaxHandler['NOT_FOUND'] = (data, res) => {
  callback(404, { error : 'path not found'}, res);
};

ajaxHandler.handle = function (data, res) {

  // select handler function as per path
  let pathHandler = this.paths[data.path];

  if (typeof(pathHandler) === 'undefined')
    pathHandler = this.NOT_FOUND;
  
  pathHandler(data, res);
};

module.exports = ajaxHandler;