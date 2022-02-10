const mongoose = require('mongoose')

const AdSchema = new mongoose.Schema({
    title: {type: String, required: true},
    category: {type: String, required: true},
    location: {type: String, required: true},
    price: {type: Number},
    exchange: {type: Boolean, default: false},
    description: {type: String},
    picturePaths: [String],
    ownerName: {type: String, required: true},
    ownerId: {type: String, required: true},
    time: {type: Date, default: Date.now},
    ratingCount: {type: Number, default: 0},
    ratingSum: {type: Number, default: 0},
    ratingAvg: {type: Number, default: 0},
}, {collection: "ad", strict: true})

module.exports = mongoose.model("AdModel", AdSchema)