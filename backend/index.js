require('dotenv').config()
const env = process.env
const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')
const auth = require('./auth');
const profile = require('./profile');

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect('mongodb+srv://' + env['MONGO_USER'] + ':' + env['MONGO_PASS'] + '@' + env['MONGO_CLUSTER'] + '.nvmh8.mongodb.net/'
 + env['MONGO_DATABASE_NAME'] + '?retryWrites=true&w=majority', (err) => {
    if(!err)
        console.log("uspesno povezivanje")
    else
        console.log(err)
});

auth(app)
profile(app)

app.listen(3030, () => { console.log("Listening on port 3030...") })