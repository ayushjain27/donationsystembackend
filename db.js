const mongoose = require('mongoose');
// const mongoURI = "mongodb://localhost:27017/project";
// const mongoURI = "mongodb://localhost:27017";
// const mongoURI = "mongodb+srv://donationsystem:Ayush2000@cluster0.ykslkvu.mongodb.net/?retryWrites=true&w=majority";
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const DATABASE = process.env.MONGO_URI;

const connectToMongo = () =>{
    mongoose.connect(DATABASE, ()=>{
        console.log("Connected to Mongo Successfully");
    });
}

module.exports = connectToMongo;