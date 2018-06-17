const mongoose=require('mongoose');

mongoose.connect('mongodb://localhost/Nepaliperiods')
    .then(()=>console.log('Connected to DB'));

const periodschema=new mongoose.Schema({
                    name:{
                    type:String,required:true,
                    minlength:5,
                    maxlength:12,
                    lowercase:true,
                    trim:true},
                    author:String,
                    price:{type:Number,required:function(){
                        return this.published;
                    },
                    get:v=>Math.round(v),
                    set:v=>Math.round(v)
                },
                    tags:{
                        type:Array,
                        
                      //  validate:{validator:function(v){
                        //    return v && v.length>0;
                        //},
                        validate:{
                            isAsync:true,
                            validator:function(v,callback)
                            {
                                setTimeout(() => {
                                    const result= v && v.length>0;
                                    callback(result);
                                    
                                }, 4000);
                            },
                        message:'A course should have at least one tag'
                    },
                   
                       
                    },
                    published:Boolean,
                    date:{type:Date, default:Date.now},
                    category:{type:String,
                    enum:['web','program'],
                required:true}


});

const Period=mongoose.model('period',periodschema); 

//createperiod();
findPeriods();
//updateperiodandsee('5b2488e80f78562d88642b6f');
//updateperiodDirect('optional');
//updateperiodDirect('5b2476712dfe2933ec5205b3');
//updateperiodMax('5b247e22b2b6830d707aad3d',500);
//deleteperiod('5b247e22b2b6830d707aad3d');
async function createperiod()
{
    const period= new Period({
        name:'REcess3',
        price:15.8,
        author:"Dhurmus",
        tags:['tester'],
        published:true,
        category:'test'
    
    });
    try
    {
        const data= await period.save();
    console.log(data);
    }
    catch(ex)
    {
        for (field in ex.errors)
        {
            console.log(ex.errors[field].message);
        }
        //console.log(ex);
    }
    

}

async function findPeriods()
{
    // const pageNumber=2;
    // const pageSize=10;
    const periods=await Period
    //.find()
    .find({_id:'5b25d05fba29652cd81f7471'})//for start with
    //.find()
    //.find({author: /ari$/})//for end with     i at the end makes it case insensitive 
    //.find({author:/.*ac.*/})//for containing dat within author
    //.or([{author:'MD Adhikari'},{tags:'optional'}])
    //.skip((pageNumber-1)*pageSize)
    //.limit(pageSize)
    //.sort({name:1})
   // .select({published:1,tags:1,author:1});
   .select({price:1,name:1});

    console.log(periods[0].price);
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

