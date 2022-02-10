const mongoose = require('mongoose')

const RatingSchema = new mongoose.Schema({
    rating: {type: Number, max: 5, min: 1, required: true, validate: {
        validator: Number.isInteger,
        messsage: "{VALUE} is not an integer"
    }},
    comment: {type: String, required: true},
    adId: {type: String, required: true},
    adTitle: {type: String, required: true},
    adOwnerId: {type: String, required: true},
    raterId: {type: String, required: true},
    raterName:{type: String, required: true},
    time: {type: Date, default: Date.now}
}, {collection: "rating", strict: true})

module.exports = mongoose.model("RatingModel", RatingSchema)