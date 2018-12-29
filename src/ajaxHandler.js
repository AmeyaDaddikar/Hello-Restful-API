/*
 * @Date 29 Dec 2018
 * @Author: Ameya S. Daddikar
 * @Description: A handler object used by the ajaxServer for handling RESTFul API requests
 * 
*/

const defaultGreetings = [
  'Hello, my name is Ameya. Nice to meet you!',
  'Hi, I am Ameya Daddikar. Nice to meet you.',
  'Hey! This is Ameya. Thanks for checking my repo.',
  'Hi! I am Ameya. Thanks for checking my repo. You can follow me on Github ; )',
  'Hello, I am Ameya and welcome to my autogenerating '
];

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
    curr_employment: 'student',
    about_repo: {
      type : 'home assignment',
      course: 'Pirple\'s NodeJS Master Class',
      routes: ['/', '/hello'],
      features: ['HTTP and HTTPS support'],
    }
  };
  callback(200, myInfo, res);
}

// 404 handler
ajaxHandler['NOT_FOUND'] = (data, res) => {
  callback(404, { error : 'route not found'}, res);
};

ajaxHandler.handle = function (data, res) {

  // select handler function as per path
  let pathHandler = this.paths[data.path];

  if (typeof(pathHandler) === 'undefined')
    pathHandler = this.NOT_FOUND;
  
  pathHandler(data, res);
};

module.exports = ajaxHandler;