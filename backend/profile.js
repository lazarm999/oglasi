const UserModel = require('./models/userModel')

module.exports = function(app){
    app.get("/user/:userId", async (req, res) => {
        let userId = req.params.userId
        try{
            let user = await UserModel.findOne({ _id: userId })
            console.log(user)
            let data = (({ _id, email, firstName, lastName, phone }) => ({ _id, email, firstName, lastName, phone }))(user)
            res.status(200).json({
                data: data
            })
        } catch(error){
            if(error.name === "CastError")
                res.status(400).json({message: "This user does not exist."})
            else
                res.status(500).json({message: "Something went wrong."})
        }
    })
}