const EventEmitter=require('events');

var url='Some url here';
class Logger extends EventEmitter{
    log(message){
        console.log(message);
        this.emit('messageLogged',{id:2,url:'some url'});
    }
}
module.exports=Logger;