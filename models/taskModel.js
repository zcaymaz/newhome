const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    useremail: {
        type:String,
        required: true
    },
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
        type: Array,
    },
    roomnumber:{
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