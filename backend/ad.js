const AdModel = require('./models/adModel')
const UserModel = require('./models/userModel')
const { v4: uuidv4 } = require('uuid')
const path = require('path')
const OrderModel = require('./models/orderModel')
const RatingModel = require('./models/ratingModel')

module.exports = function(app, conn, env){
    // {title, category, location, price, exchange, description}, files
    app.post("/postAd", async (req, res) => {
        ad = JSON.parse(req.body.data)
        files = req.files
        ad.picturePaths = []

        let user = await UserModel.findOne({_id: req.user_id})
        ad.ownerId = req.user_id
        ad.ownerName = user.firstName + ' ' + user.lastName
        try {
            if (files && files.pictures) {
                if(!Array.isArray(files.pictures)) files.pictures = [files.pictures]
                for (var i = 0; i < files.pictures.length; i++)
                    if (!files.pictures[i].mimetype.startsWith('image'))
                        res.status(400).json({message: "You can only upload images."})
                for (var i = 0; i < files.pictures.length; i++) {
                    fileName = uuidv4()
                    ad.picturePaths.push(fileName)
                    files.pictures[i].mv(path.join(env.IMAGES_PATH, fileName))
                }
            }
            await AdModel.create(ad)
            res.status(201).json({message: "Created ad"})
        } catch (error) {
            console.log(error)
            if (error.name === "ValidationError") res.status(400).json({message: "Invalid values"})
            else res.status(500).json({message: "Something went wrong."})
        }
    })

    app.get("/getAd/:adId", async (req, res) => {
        id = req.params.adId
        try {
            let ad = await AdModel.findOne({_id: id})
            if (!ad) res.status(404).json({message: "Ad does not exist"})
            let order = await OrderModel.find({ordererId: req.user_id, adId: id, phase: 2})
            let rating = await RatingModel.find({raterId: req.user_id, adId: id})
            res.status(200).json({message: "OK", data: ad, rateable: order.length > 0 && rating.length == 0})
        } catch(error) {
            console.log(error)
            res.status(500).json({message: "Something went wrong."})
        }
    })

    // ?category&location&priceLow&priceHigh&page
    // sortPrice/sortTime/sortRating=asc/desc
    app.get("/ads", async (req, res) => {
        pageSize = 10
        try {
            filter = {
                ...req.query.location && { location: req.query.location },
                ...req.query.category && { category: req.query.category },
                ...(req.query.priceLow || req.query.priceHigh) && { price: {
                    ...req.query.priceLow && { $gte: req.query.priceLow },
                    ...req.query.priceHigh && { $lte: req.query.priceHigh }
                }}
            }
            options = {
                ...req.query.page && { skip: pageSize*(req.query.page-1) },
                ...req.query.page && { limit: pageSize },
                sort: {
                    ...req.query.sortPrice && {price: req.query.sortPrice},
                    ...req.query.sortTime && {time: req.query.sortTime},
                    ...req.query.sortRating && {ratingAvg: req.query.sortRating}
                }
            }
            let ads = await AdModel.find(filter, null, options)
            res.status(200).json({message: "OK", data: ads})
        } catch(error) {
            res.status(500).json({message: "Something went wrong."})
        }
    })

    // {title, category, location, price, exchange, description}
    app.put("/updateAd/:adId", async (req, res) => {
        id = req.params.adId
        const session = await conn.startSession();
        try {
            session.startTransaction()
            const ad = await AdModel.findOne({_id: id})
            if (ad.ownerId != req.user_id) res.status(403).json({message: "This is not your ad"})
            else {
                await AdModel.updateOne(
                    {_id: id},
                    {$set: req.body},
                    {runValidators: true})
                if (req.body.title) {
                    await OrderModel.updateMany({adId: id}, {
                        $set: {adTitle: req.body.title}
                    })
                    await RatingModel.updateMany({adId: id}, {
                        $set: {
                            adTitle: req.body.title
                        }
                    })
                }
                res.status(204).json({message: "Ad updated"})
            }
            await session.commitTransaction()
        } catch (error) {
            await session.abortTransaction()
            if (error.name === "ValidationError") res.status(400).json({message: "Invalid values"})
            else res.status(500).json({message: "Something went wrong."})
        }
        session.endSession()
    })

    app.delete("/deleteAd/:adId", async (req, res) => {
        id = req.params.adId
        try {
            let ad = await AdModel.findOne({_id: id})
            let user = await UserModel.findOne({_id: req.user_id}, ['isAdmin'])
            if (!ad) res.status(404).json({message: "Ad does not exist"})
            else if (!user.isAdmin && ad.ownerId != req.user_id) res.status(403).json({message: "This is not your ad"})
            else {
                await AdModel.deleteOne({_id: id})
                res.status(204).json({message: "Ad deleted"})
            }
        } catch (error) {
            res.status(500).json({message: "Something went wrong."})
        }
    })

    app.get("/myAds", async (req, res) => {
        console.log(req.user_id)
        try {
            const ads = await AdModel.find({ownerId: req.user_id}, ['title', 'category', 'location', 'price', 'exchange', 'description',
                'picturePaths', 'time', 'ratingAvg'], {sort: {time: 'desc'}})
            res.status(200).json({message: "OK", data: ads})
        } catch (error) {
            console.log(error)
            res.status(500).json({message: "Something went wrong."})
        }
    })
}