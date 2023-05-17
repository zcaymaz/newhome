const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema({
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
    address:{
        type: String,
        required: true
    },
    startDate:{
        type: Date,
        trim: true,
        required: true
    },
    finishDate:{
        type: Date,
        trim: true,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    images:{
        type: Array,
    },
    housingnumber:{
        type: String,
    },
    features:{
        type: Array,
        default: false
    },
}, {
    timestamps: true
})

module.exports = mongoose.model("Project", projectSchema)