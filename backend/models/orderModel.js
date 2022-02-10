const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({
    ordererName: {type: String, required: true},
    ordererId: {type: String, required: true},
    supplierName: {type: String, required: true},
    supplierId: {type: String, required: true},
    phase: {type: Number, default: 0},
    adId: {type: String, required: true},
    adTitle: {type: String, required: true},
    adPicture: {type: String},
    quantity: {type: Number, min: 1, required: true, validate: {
        validator: Number.isInteger,
        message: '{VALUE} is not an integer'
    }},
    address: {type: String, required: true},
    city: {type: String, required: true}
}, {collection: "order", strict: true})

module.exports = mongoose.model("OrderModel", OrderSchema)