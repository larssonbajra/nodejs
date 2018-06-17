const Joi=require('joi');
const express=require('express');
const router=express.Router();
const courses=[{id:1,name:'course1'},{id:2,name:'course2'},{id:3,name:'course3'},];


//router.get('/',(req,res)=>{
    //res.send(process.env.PORT);
//});
router.get('/',(req,res)=>{
    //res.send(courses);
    res.render('index',{title:'application',message:'Hello Man'});
});

//router.get('/api/courses/:id',(req,res)=>{
  //  res.send(req.params.id);
//});
router.get('/api/posts/:year/:month',(req,res)=>{
    res.send(req.query);
});


router.get('/:id',(req,res)=>{
 const course=courses.find(c=>c.id===parseInt(req.params.id));  
 if(!course) return res.status(404).send('course with id not found');
 res.send(course);
});

router.post('/',(req,res)=>{
const {error}=validateCourse(req.body);
if(error) return  res.status(400).send(error.details[0].message);
const course={
id:courses.length+1,
name:req.body.name
};
courses.push(course);
res.send(course);
});



router.put('/:id',(req,res)=>{
    const course=courses.find(c=>c.id===parseInt(req.params.id));  
    if(!course) return  res.status(404).send('course with id not found');
    //if not exist, return 404
    //then validate
    //if invalid,return 404
    //const result=validateCourse(req.body);
    const {error}=validateCourse(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    //update
    course.name=req.body.name;
    //return updated course
    res.send(course);
});



router.delete('/:id',(req,res)=>{
    const course=courses.find(c=>c.id===parseInt(req.params.id));  
    if(!course) return res.status(404).send('course with id not found');

    const index=courses.indexOf(course);
    courses.splice(index,1);
    res.send(course);
});



function validateCourse(course)
{
    const schema={
        name:Joi.string().min(3).required()
            };
            return Joi.validate(course,schema);
}
module.exports=router;
