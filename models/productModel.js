// const mongoose = require('mongoose')


// const productSchema = new mongoose.Schema({
//     product_id:{
//         type: String,
//         unique: true,
//         trim: true,
//         required: true
//     },
//     title:{
//         type: String,
//         trim: true,
//         required: true
//     },
//     address:{
//         type: String,
//         required: true
//     },
//     price:{
//         type: Number,
//         trim: true,
//         required: true
//     },
//     description:{
//         type: String,
//         required: true
//     },
//     type:{
//         type: String,
//         required: true
//     },
//     images:{
//         type: Object,
//         required: true
//     },
//     roomnumber:{
//         type: String,
//         required: true
//     },
//     features:{
//         type: String,
//         default: false
//     },
// }, {
//     timestamps: true //important
// })


// module.exports = mongoose.model("Products", productSchema)