const mongoose = require('mongoose');
const { Schema } = mongoose;

const NgoinfoSchema = new Schema({
    ngo:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ngo'
    },
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    image:{
        type: String,
    },
    number:{
        type: Number,
        required: true
    },
    dor:{
        type: String
    },
    instagram:{
        type: String 
    },
    date:{
        type: Date,
        default: Date.now
    }
})

const Ngoinfo = mongoose.model('ngoinfo', NgoinfoSchema);
module.exports = Ngoinfo;
