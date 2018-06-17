const EventEmitter=require('events');
const emitter=new EventEmitter();
module.exports=emitter;
//register a listener
emitter.on('messageLogged',(arg)=>{
console.log('listener called',arg.id);
});
const log=require('./logger.js');
log('Message');
