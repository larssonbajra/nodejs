const Joi=require('joi');
const express=require('express');
const app=express();
app.use(express.json());
//const genres=[{id:1,name:'thriller'},{id:2,name:'comedy'},{id:3,name:'romance'},];
const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/genreData')
.then(console.log('Database Connected'));
const genreSchema=new mongoose.Schema({
    id:Number,
    name:String

})
const Genre=mongoose.model('genre',genreSchema);

createGenre();
findGenre();

async function createGenre(){
    const genre=new Genre({
        id:3,
        name:'romance'
    })
    const result=await genre.save();
    console.log(result);
}

async function findGenre(ID)
{
    const genre=await Genre
    .find({_id:ID})
    .select({name:1,id:1});
    console.log(genre);
}


