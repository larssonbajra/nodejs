const EventEmitter=require('events');
const emitter=new EventEmitter();
var url='http://mylogger.io/log';
const logg=require('./app.js');

function log(message){
  //send HTTP request
  console.log(message);
//raise an event
logg.emit('messageLogged',{id:1,url:'http://'});
}

module.exports=log; 
