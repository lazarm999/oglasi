require('dotenv').config()
const env = process.env
const cors = require('cors')
const express = require('express')
const fileUpload = require('express-fileupload')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const auth = require('./auth');
const user = require('./user')
const ad = require('./ad')
const lookups = require('./lookups')
const order = require('./order')
const rating = require('./rating')
const statistics = require('./statistics')

const app = express()
app.use(cors())
app.use(express.json())
app.use(fileUpload({
    createParentPath: true
}))
app.use(express.static(env.IMAGES_PATH))

mongoose.connect('mongodb+srv://' + env['MONGO_USER'] + ':' + env['MONGO_PASS'] + '@' + env['MONGO_CLUSTER'] + '.nvmh8.mongodb.net/'
 + env['MONGO_DATABASE_NAME'] + '?retryWrites=true&w=majority', (err) => {
    if(!err)
        console.log("uspesno povezivanje")
    else
        console.log(err)
});

auth(app, env)

app.use((req, res, next) => {
    let token = req.header('Authorization')
    try {
        let decoded = jwt.verify(token, env.JWT_SECRET)
        req.user_id = decoded.user_id
        next()
    } catch(e) {
        res.status(401).json({message: "You are not authorized"})
    }
})

user(app, mongoose.connection)
ad(app, mongoose.connection, env)
lookups(app)
order(app)
rating(app, mongoose.connection)
statistics(app)

app.listen(3030, () => { console.log("Listening on port 3030...") })