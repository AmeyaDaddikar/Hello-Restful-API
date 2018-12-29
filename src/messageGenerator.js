/*
 * @Date 29 Dec 2018
 * @Author: Ameya S. Daddikar
 * @Description: A generator that generates random messagaes and translates them if provided with lang
 * 
*/



const https  = require('https');
const querystring = require('querystring');

const config = require('../config/');

//API constants
const YANDEX_API = {
  hostname: 'translate.yandex.net',
  path: '/api/v1.5/tr.json/translate'
};

//List of default greetings
const defaultGreetings = [
  'Hello, my name is Ameya. Nice to meet you!',
  'Hi, I am Ameya Daddikar. Nice to meet you.',
  'Hey! This is Ameya. Thanks for checking my repo.',
  'Hi! I am Ameya. Thanks for checking my repository. You can follow me on Github ; )',
  'Hello, I am Ameya and welcome to my random greeting API.',
  'Hello, did you know this route has a translate functionality too? try /hello?lang=langcode eg. en, ru, hi'
];

let messageGenerator = {};

messageGenerator.generate = function (lang, resolve, reject) {
  
  //selects a random message
  const randomMessage = defaultGreetings[Math.floor(
    Math.random() * defaultGreetings.length
    )];
  
  //default message, in case translation fails or lang isn't set
  const defaultMessage = {message : randomMessage, lang};

  // lang not set
  if (typeof(config.translate_key) === 'undefined')
    resolve(defaultMessage);

  
  // POST message data for the translator API
  const postData = querystring.stringify({
    key: config.translate_key,
    text: randomMessage,
    lang
  });

  // HTTPS request() method options
  const options = {
    hostname: YANDEX_API.hostname,
    port: 443,
    path: YANDEX_API.path,
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': postData.length
    }
  };
  //buffer for recieving data from translator API
  let response_buffer = '';

  const req = https.request(options, (res) => {
    res.on('data', (data) => {
      response_buffer += data;
    });

    res.on('end', ()=> {
      // converting string to JSON
      let message = JSON.parse(response_buffer);

      resolve({lang, message: response_buffer});
    })
  });

  req.on('error', (err) => {
    // incase the network fails, or the API key fails, to handle the failed HTTPS request
    console.log('HTTPS request to Yandex failed.', err);
    reject({});
  });

  req.write(postData);
  req.end();
}
module.exports = messageGenerator;