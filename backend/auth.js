const UserModel = require('./models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports = function(app, env){
    // {email, password, firstName, lastName, phone}
    app.post("/register", async (req, res) => {
        delete req.body.isAdmin
        let user = await UserModel.findOne({ email: req.body.email }, ['_id'])
        console.log(user)
        if (user) res.status(400).json({message: "User with this email already exists."})
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
            let user = await UserModel.findOne({email: req.body.email}, ['password', 'isAdmin'])
            if (user && bcrypt.compareSync(req.body.password, user.password)){
                let userId = user._id.toString()
                let token = jwt.sign({user_id: userId}, env.JWT_SECRET)
                res.status(200).json({data: {token: token, userId: userId, isAdmin: user.isAdmin}})
            } else res.status(401).json({message: "Wrong email or password."})
        } catch(error) {
            res.status(500).json({message: "Something went wrong."})
        }
    })
}