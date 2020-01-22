/*
 * @Date 29 Dec 2018
 * @Author: Ameya S. Daddikar
 * @Description: A handler object used by the ajaxServer for handling RESTFul API requests
 * 
*/

const messageGenerator = require('./messageGenerator');


let ajaxHandler = {
  paths : {},
};

// /hello path handler
ajaxHandler.paths['hello'] = (data, callback) => {
  //default language, Hindi
  let lang = 'hi';

  //sets lang if provided via GET
  if (typeof(data.query) !== 'undefined')
    if (typeof(data.query.lang) !== 'undefined')
      lang = data.query.lang;
  
  const inputMessage = data.query.inputMessage;
  
  //A Promise to call the callback function once the appropriate message is generated
  const messageGeneratorPromise = new Promise((resolve, reject) => {
    messageGenerator.generate(lang, inputMessage, resolve);
  });

  // Success in message generation
  messageGeneratorPromise.then((message) => {
    callback({ code: 200, payload: message });
  });

  // Internal Server Error
  messageGeneratorPromise.catch((err) => {
    callback({ code: 500 });
  });

}

ajaxHandler.paths[''] = (data, callback) => {
  let myInfo = {
    name  : 'Ameya Daddikar',
    alias : 'coldball',
    country: 'India',
    curr_employment: 'student',
    about_repo: {
      type : 'home assignment',
      course: 'Pirple\'s NodeJS Master Class',
      routes: ['/', '/hello', '/hello?lang=${en/ru/hi/.....}', '/ping'],
      features: ['HTTP and HTTPS support'],
    }
  };
  callback({ code: 200, payload: myInfo });
}

// ping
ajaxHandler.paths['ping'] = (data, callback) => {
  callback({ code: 200 });
};


// 404 handler
ajaxHandler['NOT_FOUND'] = (data, callback) => {
  callback({ code: 404 });
};

ajaxHandler.handle = function (data, res) {

  // select handler function as per path
  let pathHandler = this.paths[data.path];

  if (typeof(pathHandler) === 'undefined')
    pathHandler = this.NOT_FOUND;
  
  // A promise that gets the response from handler and accordingly calls callback
  // created so that there is no need to pass the res obj to handlers
  const pathHandlerPromise = new Promise((resolve, reject) => {
    pathHandler(data, resolve, reject);
  });

  // called once the handler resolves/handles the request
  pathHandlerPromise.then((handlerResponse) => {

    res.setHeader('Content-Type', 'application/json');
    res.setHeader("Access-Control-Allow-Origin", "ameyadaddikar.github.io");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.writeHead(handlerResponse.code);

    let responseString;
    if (typeof(handlerResponse.payload) !== 'undefined'){
      responseString = JSON.stringify(handlerResponse.payload);
    }

    res.end(responseString);

  });

  // unused since reject not passed in the handler
  // Handlers internally handle any 500 errors
  // can be used in future as a dedicated error handling
  pathHandlerPromise.catch(() => {
    res.writeHead(500);
    res.end();
  });


};

module.exports = ajaxHandler;