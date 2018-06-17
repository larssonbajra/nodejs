const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/playground')
.then(()=>console.log('Database connected'))
.catch(err=>console.log('Could not connect to database',err));

const courseSchema=new mongoose.Schema({
    name: String,
    author:String,
    tags:[String],
    date:{type:Date,default:Date.now},
    isPublished:Boolean
});

//naya wala
const movieSchema=new mongoose.Schema({
    name: String,
    Director:String,
    tags:[String],
    date:{type:Date,default:Date.now},
    isReleased:Boolean,
    Rating:Number
});

const Course=mongoose.model('course',courseSchema);

const Movie=mongoose.model('movie',movieSchema);
//eq
//neq
//gt
//gte
//lt
//lte
//in
//nin
//Make Movie

async function CreateMovie(){
    const movie=new Movie({
        name: 'Forest Gump',
        Director:'Danny Weelbeck',
        tags:['Tom Hanks','nude'],
        isReleased:true,
        Rating:18
    });
    const result=await movie.save();
    console.log(result);
}

async function CreateCourse(){
    const course=new Course({
        name:'Angular course',
        author:'Larsson',
        tags:['angular','frontend'],
        isPublished:true
    });
    const result=await course.save();
    console.log(result);
}

async function GetCourse(){
    const data=await Course.find({name:'Angular course'})
    .limit(10)
    .sort({name:1})
    .select({name:1,tags:1});
    console.log(data);
}

async function GetMovie(){
    const data=await Movie
    //.find({Rating:{$gte:10}})
    //.find({Rating:{$in:[10,15,20]}})
    .find()
    .or([{name:'Terminator'},{tags:{$regex:'nu'}}])
    .select({name:1,Rating:1});
    console.log(data);
}
//CreateCourse();
//GetCourse();
//CreateMovie();
GetMovie();