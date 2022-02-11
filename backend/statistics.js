const AdModel = require('./models/adModel')
const OrderModel = require('./models/orderModel')
const RatingModel = require('./models/ratingModel')
const UserModel = require('./models/userModel')

// groupBy - category, location
async function getStats(groupBy, from, to) {
    let count = await AdModel.aggregate().match({ time: {$gte: new Date(from), $lte: new Date(to)} })
                    .group({_id: "$"+groupBy, count: {$sum: 1}})
    let revenue = await OrderModel.aggregate([{ $match: { timeSent: {$gte: new Date(from), $lte: new Date(to)}, phase: 2 }},
        { $set: {adId: {$toObjectId: "$adId"}}},
        { $lookup: {from: "ad", localField: "adId", foreignField: "_id", as: "ad"} },
        { $project: {quantity: 1, ad: {$arrayElemAt: ["$ad", 0]}} },
        { $group: {_id: "$ad."+groupBy, revenue: {$sum: {$multiply: ["$quantity", "$ad.price"]}}} }
    ])
    return {count: count, revenue: revenue}
}

module.exports = function(app) {
    app.get("/stats", async (req, res) => {
        let from = req.query.from
        let to = req.query.to
        try {
            let user = await UserModel.findOne({_id: req.user_id}, ['isAdmin'])
            if (!user.isAdmin) res.status(403).json({message: "You must be an administrator to view this"})
            else {
                data = {
                    category: await getStats("category", from, to),
                    location: await getStats("location", from, to)
                }
                res.status(200).json({message: "OK", data: data})
            }
        } catch(error) {
            console.log(error)
            res.status(500).json({message: "Something went wrong."})
        }
    })
}