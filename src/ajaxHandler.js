/*
 * @Date 29 Dec 2018
 * @Author: Ameya S. Daddikar
 * @Description: A handler object used by the ajaxServer for handling RESTFul API requests
 * 
*/

const messageGenerator = require('./messageGenerator');

// helper function: used by all paths to generate their HTTP/HTTPS response
const callback = function (res, statusCode = 500, payload = {}) {

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
  //default language, Hindi
  let lang = 'hi';

  //sets lang if provided via GET
  if (typeof(data.query) !== 'undefined')
    if (typeof(data.query.lang) !== 'undefined')
      lang = data.query.lang;
  
  //A Promise to call the callback function once the appropriate message is generated
  const messageGeneratorPromise = new Promise((resolve, reject) => {
    messageGenerator.generate(lang, resolve);
  });

  // Success in message generation
  messageGeneratorPromise.then((message) => {
    callback(res, 200, message);
  });

  // Internal Server Error
  messageGeneratorPromise.catch((err) => {
    callback(res, 500);
  });

}

ajaxHandler.paths[''] = (data, res) => {
  let myInfo = {
    name  : 'Ameya Daddikar',
    alias : 'coldball',
    country: 'India',
    curr_employment: 'student',
    about_repo: {
      type : 'home assignment',
      course: 'Pirple\'s NodeJS Master Class',
      routes: ['/', '/hello', '/hello?lang=${en/ru/hi/.....}'],
      features: ['HTTP and HTTPS support'],
    }
  };
  callback(res, 200, myInfo);
}

// 404 handler
ajaxHandler['NOT_FOUND'] = (data, res) => {
  callback(res, 404);
};

ajaxHandler.handle = function (data, res) {

  // select handler function as per path
  let pathHandler = this.paths[data.path];

  if (typeof(pathHandler) === 'undefined')
    pathHandler = this.NOT_FOUND;
  
  pathHandler(data, res);
};

module.exports = ajaxHandler;