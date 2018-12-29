/*
 * @Date 29 Dec 2018
 * @Author: Ameya S. Daddikar
 * @Description: Config file for server
 * 
*/

const fs = require('fs');

let config = {};

config.debug = {
  httpPort : 5000,
  httpsPort : 5001
};

// if using alongside another localhost server that has occupied the above ports
config.debug2 = {
  httpPort : 3000,
  httpsPort : 3001
};

let currConfig = config[process.env.NODE_ENV];

if (typeof(currConfig) === 'undefined')
  currConfig = config.debug;

try{
  // trying to read config/private.json file
  const private_config = JSON.parse(
    fs.readFileSync('./config/private.json', {encoding:'utf-8', flag:'r'})
  );

  // https://tech.yandex.com/translate/
  currConfig.translate_key = private_config.yandex_api_key;

} catch(err){
  console.log('Unable to read private.json.\nThe Translation feature is disabled.');
}

// https server key setup
try{
  httpsOptions = {
    key  : fs.readFileSync('./config/key.pem', {encoding:'utf-8', flag:'r'}),
    cert : fs.readFileSync('./config/cert.pem', {encoding:'utf-8', flag:'r'}),
  };
  currConfig.httpsOptions = httpsOptions;

} catch(err){
  console.log('Unable to set key and ceritificate for HTTPS');
}

module.exports = currConfig;
