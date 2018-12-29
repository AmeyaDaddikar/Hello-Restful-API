/*
 * @Date 29 Dec 2018
 * @Author: Ameya S. Daddikar
 * @Description: A generator that generates random messagaes and translates them if provided with lang
 * 
*/



const https  = require('https');
const querystring = require('querystring');

const config = require('../config/');
const YANDEX_API = {
  hostname: 'translate.yandex.net',
  path: '/api/v1.5/tr.json/translate'
};


const defaultGreetings = [
  'Hello, my name is Ameya. Nice to meet you!',
  'Hi, I am Ameya Daddikar. Nice to meet you.',
  'Hey! This is Ameya. Thanks for checking my repo.',
  'Hi! I am Ameya. Thanks for checking my repository. You can follow me on Github ; )',
  'Hello, I am Ameya and welcome to my random greeting API.',
  'Hello, did you know this route has a translate functionality too? try /hello?lang=langcode eg. en, ru, hi'
];

let messageGenerator = {};

messageGenerator.generate = function (lang, callback, res) {
  
  const responseCallback = function (data) {
    callback(res, 200, data);
  }
  const randomMessage = defaultGreetings[Math.floor(
    Math.random() * defaultGreetings.length
    )];
  
  const defaultMessage = {message : randomMessage, lang};

  if (typeof(config.translate_key) === 'undefined')
  responseCallback(defaultMessage);


  const postData = querystring.stringify({
    key: config.translate_key,
    text: randomMessage,
    lang
  });

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
  let response_buffer = '';

  const req = https.request(options, (res) => {
    res.on('data', (data) => {
      response_buffer += data;
    });

    res.on('end', ()=> {
      let message = JSON.parse(response_buffer);

      responseCallback({lang, message: response_buffer});
    })
  });

  req.on('error', (err) => {

    console.log('HTTPS request to Yandex failed.', err);
    responseCallback({});
  });

  req.write(postData);
  req.end();
}
module.exports = messageGenerator;