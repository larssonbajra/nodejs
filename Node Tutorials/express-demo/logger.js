
    module.exports.aut=function(req,res,next){
        console.log('Authentication...');
        next();
        }
    module.exports.log=function(req,res,next){
        console.log('logging...');
        next();
        }
    //module.exports=aut;