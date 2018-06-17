const config=require('config');
const startupDebugger=require('debug')('app:startup');
const dbDebugger=require('debug')('app:db');
const helmet=require('helmet');
const morgan=require('morgan');
const courses=require('./routes/courses');
const Joi=require('joi');
const logger=require('./logger');
const express=require('express');
const app=express();

app.set('view engine','pug');
app.set('views','./views');//default
//console.log(`NODE_ENV:${process.env.NODE_ENV}`);
//console.log(`app:${app.get('env')}`);
app.use(express.json());//using JSON data type
app.use(express.urlencoded({extended:true}));//sendingg url code EG: key=90&key2=09
app.use(express.static('public'));//serving static contents in middleware
app.use(helmet());
console.log('application name '+ config.get('name'));
console.log('Mail server '+ config.get('mail.host'));
console.log('Mail password '+ config.get('mail.password'));

if (app.get('env')=='development')
{
    app.use(morgan('tiny'));
    startupDebugger('Morgan enabled');
}
//dB work
dbDebugger('dB enabled');

app.use(logger.log);
app.use(logger.aut);
app.use('/api/courses',courses);
//app.use(logger.aut());


const port=process.env.PORT || 3000;
app.listen(port,()=>console.log(`listening on ${port}.....`));

