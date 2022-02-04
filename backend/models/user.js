const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    email: {type: String, required: true},
    password: {type: String, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    phone: {type: String, default: ""},
}, {collection: "user"})

module.exports = mongoose.model("UserModel", UserSchema)