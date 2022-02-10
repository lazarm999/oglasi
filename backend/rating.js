const AdModel = require('./models/adModel')
const OrderModel = require('./models/orderModel')
const RatingModel = require('./models/ratingModel')

module.exports = function(app, conn) {
    // {rating, comment}
    app.post("/rate/:adId", async (req, res) => {
        id = req.params.adId
        r = req.body
        const session = await conn.startSession();
        try {
            session.startTransaction()
            let ad = await AdModel.findOne({_id: id}, ['title', 'ownerId', 'ratingCount', 'ratingSum'])
            if (!ad) res.status(404).json({message: "Ad does not exist"})
            else {
                let order = await OrderModel.find({ordererId: req.user_id, adId: id, phase: 2})
                let rating = await RatingModel.find({raterId: req.user_id, adId: id})
                if (order.length == 0) res.status(400).json({message: "You can only rate ads which you have received"})
                else if (rating.length > 0) res.status(400).json({message: "You can only rate an ad once"})
                else {
                    // moze rejting
                    r.adId = id
                    r.adTitle = ad.title
                    r.adOwnerId = ad.ownerId
                    r.raterId = req.user_id
                    r.raterName = order[0].ordererName
                    await RatingModel.create(r)

                    ratingCount = ad.ratingCount + 1
                    ratingSum = ad.ratingSum + r.rating
                    ratingAvg = ratingSum/ratingCount
                    await AdModel.updateOne(
                        {_id: id},
                        {$set: {
                            ratingCount: ratingCount,
                            ratingSum: ratingSum,
                            ratingAvg: ratingAvg
                        }},
                        {runValidators: true})
                    await session.commitTransaction()
                    res.status(201).json({message: "Posted rating"})
                }
            }
        } catch(error) {
            console.log(error)
            await session.abortTransaction()
            if (error.name === "ValidationError") res.status(400).json({message: "Invalid values"})
            else res.status(500).json({message: "Something went wrong."})
        }
        session.endSession()
    })

    app.get("/adRatings/:adId", async (req, res) => {
        id = req.params.adId
        try {
            ratings = await RatingModel.find({adId: id}, ['rating', 'comment', 'raterId', 'raterName', 'time'], {sort: {time: 'desc'}})
            res.status(200).json({message: "OK", data: ratings})
        } catch(error) {
            res.status(500).json({message: "Something went wrong."})
        }
    })

    app.get("/userRatings/:id", async (req, res) => {
        id = req.params.id
        try {
            ratings = await RatingModel.find({adOwnerId: id}, ['rating', 'comment', 'raterId', 
                'raterName', 'time', 'adId', 'adTitle'], {sort: {time: 'desc'}})
            res.status(200).json({message: "OK", data: ratings})
        } catch(error) {
            res.status(500).json({message: "Something went wrong."})
        }
    })
}