const EventEmitter=require('events');
const Logger=require('./logger.js');
const logger=new Logger();
//register a listener
logger.on('messageLogged',(arg)=>{
    console.log('listener called',arg.id);
    });
logger.log('Message');
