const mongoose = require('mongoose');

const restaurentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique:true
    },
    imagesLink: {
        type: [String],
        required: true
    },
    description: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    },
    totalTables: {
        type: Number,
        required: true
    },
    tablesAvailable: {
        type: Number,
        required: true
    },
    menuImage: {
        type: [String],
        required: true
    },
    review: {
        type: [String] 
    }
}, { "strict": "throw" }); 

const Restaurent = mongoose.model('restaurent', restaurentSchema);
module.exports = Restaurent;