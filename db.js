const mongoose = require('mongoose');
// const mongoURI = "mongodb://localhost:27017/project";
// const mongoURI = "mongodb://localhost:27017";
const mongoURI = "mongodb+srv://donationsystem:Ayush2000@cluster0.ykslkvu.mongodb.net/?retryWrites=true&w=majority";

const connectToMongo = () =>{
    mongoose.connect(mongoURI, ()=>{
        console.log("Connected to Mongo Successfully");
    });
}

module.exports = connectToMongo;