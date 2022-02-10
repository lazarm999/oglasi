const AdModel = require('./models/adModel')
const OrderModel = require('./models/orderModel')
const RatingModel = require('./models/ratingModel')
const UserModel = require('./models/userModel')

module.exports = function(app) {
    app.get("/stats", async (req, res) => {
        from = req.query.from
        to = req.query.to
        try {
            let user = await UserModel.findOne({_id: req.user_id}, ['isAdmin'])
            if (!user.isAdmin) res.status(403).json({message: "You must be an administrator to view this"})
            else {
                //categories = await AdModel.aggregate([{ $match: { time: {$gte: new Date(from).toDateString(), $lte: new Date(to).toDateString()} }}])
                categories = await AdModel.find({time : {$gte: from, $lte: to}})
                res.status(200).json({message: "OK", data: categories})
            }
        } catch(error) {
            res.status(500).json({message: "Something went wrong."})
        }
    })
}