var a=;
var url='http://mylogger.io/log';

function log(message){
  //send HTTP request
  console.log(message);
}

module.exports.log=log; //manly done to export multiple functions or variables
//if only one function, we can directly use module.exports
//module.exports.endPoint=url;
