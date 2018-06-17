const path=require('path');
const ospath=require('os');
var pathObj=path.parse(__filename);
var osfree=ospath.freemem();
var ostotal=ospath.totalmem();
console.log(pathObj);
console.log(osfree);
console.log(`Total memory: ${ostotal}`);
