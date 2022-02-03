require('dotenv').config()
const env = process.env
const express = require('express')

const app = express()
const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://' + env['MONGO_USER'] + ':' + env['MONGO_PASS'] + '@' + env['MONGO_CLUSTER'] + '.nvmh8.mongodb.net/'
 + env['MONGO_DATABASE_NAME'] + '?retryWrites=true&w=majority', (err) => {
    console.log(err)
    console.log("uspesno povezivanje")
});

app.listen(5000, () => { console.log("konektovan") })