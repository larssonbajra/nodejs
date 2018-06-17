const mongoose=require('mongoose');

mongoose.connect('mongodb://localhost/Nepaliperiods')
    .then(()=>console.log('Connected to DB'))

const periodschema=new mongoose.Schema({
                    name:String,
                    author:String,
                    price:Number,
                    tags:[String],
                    published:Boolean,
                    date:{type:Date, default:Date.now}


});

const Period=mongoose.model('Period',periodschema); 

//createperiod();
//findPeriods();
//updateperiodandsee('5b2488e80f78562d88642b6f');
//updateperiodDirect('optional');
//updateperiodDirect('5b2476712dfe2933ec5205b3');
//updateperiodMax('5b247e22b2b6830d707aad3d',500);
deleteperiod('5b247e22b2b6830d707aad3d');
async function createperiod()
{
    const period= new Period({
        name:'History2',
        price:10,
        author:"Sitaram Danarasi",
        tags:['King','gradeII'],
        published:true
    
    });
    const data= await period.save();
    console.log(data);

}

async function findPeriods()
{
    const pageNumber=2;
    const pageSize=10;
    const periods=await Period
    //.find()
    .find({author: /^BK/})//for start with
    //.find()
    //.find({author: /ari$/})//for end with     i at the end makes it case insensitive 
    //.find({author:/.*ac.*/})//for containing dat within author
    //.or([{author:'MD Adhikari'},{tags:'optional'}])
    //.skip((pageNumber-1)*pageSize)
    //.limit(pageSize)
    //.sort({name:1})
   // .select({published:1,tags:1,author:1});
   .count();
    console.log(periods);
}

async function updateperiodandsee(id)
{
    const period=await Period.findByIdAndUpdate(id,
    {$set:{
        author:"Lapa Man"
    }},{new:true});
   

   
    console.log(period);
}


async function updateperiodDirect(tagdata)
{
    const result=await Period.update({tags:tagdata},{
        $set:{   
        author:"Larsson Bajracharya",
        price:456456,
        published:false}
     
    });
    console.log(result);
   
}

async function updateperiodMax(id,money)
{
    const period=await Period.update({_id:id},
    {$max:{price:money}});
   

   
    console.log(period);
}

async function deleteperiod(id)
{
    const period=await Period.deleteMany({price:{$lte:100}}
    );
   

   
    console.log(period);
}

