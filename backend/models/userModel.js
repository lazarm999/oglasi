const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    email: {type: String, required: true},
    password: {type: String, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    phone: {type: String, default: ""},
    isAdmin: {type: Boolean, default: false, immutable: true}
}, {collection: "user", strict: true})
UserSchema.index({email: 1})

module.exports = mongoose.model("UserModel", UserSchema)