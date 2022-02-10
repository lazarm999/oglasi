const UserModel = require('./models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const env = process.env

module.exports = function(app){
    // {email, password, firstName, lastName, phone}
    app.post("/register", async (req, res) => {
        delete req.body.isAdmin
        let user = await UserModel.findOne({ email: req.body.email })
        if(user) res.status(400).json({message: "User with this email already exists."})
        else {
            req.body.password = bcrypt.hashSync(req.body.password, 10)
            try { 
                await UserModel.create(req.body)
                res.status(201).json({message: "OK"})
            } catch (error){
                if (error.name === "ValidationError") res.status(400).json({message: "You must fill all required fields"})
                else res.status(500).json({message: "Something went wrong."})
            }
        }
    })

    // {email, password}
    app.post("/login", async (req, res) => {
        try {
            let user = await UserModel.findOne({email: req.body.email})
            if(user && bcrypt.compareSync(req.body.password, user.password)){
                let userId = user._id.toString()
                token = jwt.sign({user_id: userId}, env.JWT_SECRET)
                res.status(200).json({data: {token: token, userId: userId}})
            } else res.status(401).json({message: "Wrong email or password."})
        } catch(error) {
            res.status(500).json({message: "Something went wrong."})
        }
    })
}