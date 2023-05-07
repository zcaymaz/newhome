const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    title:{
        type: String,
        trim: true,
        required: true
    },
    address:{
        type: String,
        required: true
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
        type: Object,
    },
    roomnumber:{
        type: String,
    },
    squaremeters:{
        type: String,
        required: true
    },
    features:{
        type: String,
        default: false
    },
}, {
    timestamps: true
})

module.exports = mongoose.model("Task", taskSchema)