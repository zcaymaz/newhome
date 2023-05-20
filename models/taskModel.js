const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    useremail: {
        type:String,
        required: true
    },
    name: {
        type:String,
        required: true
    },
    title:{
        type: String,
        trim: true,
        required: true
    },
    location:{
        type: Array,
    },
    price:{
        type: Number,
        trim: true,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    type:{
        type: String,
    },
    images:{
        type: Array,
    },
    roomnumber:{
        type: String,
    },
    saletype:{
        type: String,
    },
    squaremeters:{
        type: String,
    },
    features:{
        type: Array,
        default: false
    },
}, {
    timestamps: true
})

module.exports = mongoose.model("Task", taskSchema)