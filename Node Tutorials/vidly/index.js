const Joi=require('joi');
const express=require('express');
const app=express();
app.use(express.json());
const genres=[{id:1,name:'thriller'},{id:2,name:'comedy'},{id:3,name:'romance'},];


app.get('/',(req,res)=>{
    res.send(process.env.PORT);
});
app.get('/api/genres',(req,res)=>{
    res.send(genres);
});

//app.get('/api/genres/:id',(req,res)=>{
  //  res.send(req.params.id);
//});
app.get('/api/posts/:year/:month',(req,res)=>{
    res.send(req.query);
});


app.get('/api/genres/:id',(req,res)=>{
 const genre=genres.find(c=>c.id===parseInt(req.params.id));  
 if(!genre) return res.status(404).send('genre with id not found');
 res.send(genre);
});

app.post('/api/genres',(req,res)=>{
const {error}=validateGenre(req.body);
if(error) return  res.status(400).send(error.details[0].message);
const genre={
id:genres.length+1,
name:req.body.name
};
genres.push(genre);
res.send(genre);
});



app.put('/api/genres/:id',(req,res)=>{
    const genre=genres.find(c=>c.id===parseInt(req.params.id));  
    if(!genre) return  res.status(404).send('genre with id not found');
    //if not exist, return 404
    //then validate
    //if invalid,return 404
    //const result=validategenre(req.body);
    const {error}=validateGenre(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    //update
    genre.name=req.body.name;
    //return updated genre
    res.send(genre);
});



app.delete('/api/genres/:id',(req,res)=>{
    const genre=genres.find(c=>c.id===parseInt(req.params.id));  
    if(!genre) return res.status(404).send('genre with id not found');

    const index=genres.indexOf(genre);
    genres.splice(index,1);
    res.send(genre);
});



function validateGenre(genre)
{
    const schema={
        name:Joi.string().min(3).required()
            };
            return Joi.validate(genre,schema);
}

const port=process.env.PORT || 3000;
app.listen(port,()=>console.log(`listening on ${port}.....`));

