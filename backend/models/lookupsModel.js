const mongoose = require('mongoose')

const LookupsSchema = new mongoose.Schema({
    type: {type: String, required: true},
    data: {type: [String], required: true}
}, {collection: "lookups", strict: true})

module.exports = mongoose.model("LookupsModel", LookupsSchema)