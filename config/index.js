/*
 * @Date 29 Dec 2018
 * @Author: Ameya S. Daddikar
 * @Description: Config file for server
 * 
*/

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

module.exports = currConfig;