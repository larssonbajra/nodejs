const mongoose=require('mongoose');

mongoose.connect('mongodb://localhost/NepaliCourses')
    .then(()=>console.log('Connected to DB'))

const courseSchema=new mongoose.Schema({
                    name:String,
                    author:String,
                    tags:[String],
                    published:Boolean,
                    date:{type:Date, default:Date.now}


});

const Course=mongoose.model('Course',courseSchema); 

//createCourse();
findCourses();
//updateCourse('5b237ace6dba351cf4aee697');
updateCourseDirect('5b2476712dfe2933ec5205b3');
async function createCourse()
{
    const course= new Course({
        name:'MathematicsII',
        author:"BK Bajra",
        tags:['compulsory','grade10'],
        published:true
    
    });
    const data= await course.save();
    console.log(data);

}

async function findCourses()
{
    const pageNumber=2;
    const pageSize=10;
    const courses=await Course
    //.find()
    .find({author: /^BK/})//for start with
    //.find()
    //.find({author: /ari$/})//for end with     i at the end makes it case insensitive 
    //.find({author:/.*ac.*/})//for containing dat within author
    //.or([{author:'MD Adhikari'},{tags:'optional'}])
    .skip((pageNumber-1)*pageSize)
    .limit(pageSize)
    //.sort({name:1})
   // .select({published:1,tags:1,author:1});
   .count();
    console.log(courses);
}

async function updateCourse(id)
{
    const course=await Course.findById(id);
    if(!course) return;
    course.published=true;
    course.author='Hari Ram';

    const result= await course.save();
    console.log(result);
}


async function updateCourseDirect(id)
{
    const result=await Course.update({_id:id},{
        $set:{   
        author:"Larsson Bajracharya",
        published:false}
     
    });
    console.log(result);
   
}



