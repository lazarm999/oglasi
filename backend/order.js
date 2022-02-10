const OrderModel = require('./models/orderModel')
const AdModel = require('./models/adModel')
const UserModel = require('./models/userModel')

module.exports = function(app){

    // {quantity, address, city}
    app.post("/order/:adId", async (req, res) => {
        id = req.params.adId
        try {
            const ad = await AdModel.findOne({_id: id}, ['title', 'ownerId', 'ownerName', 'picturePaths'])
            if (!ad) res.status(400).json({message: "Ad not found"})
            else {
                const orderer = await UserModel.findOne({_id: req.user_id}, ['firstName', 'lastName'])
                order = req.body
                order.ordererName = orderer.firstName + " " + orderer.lastName
                order.ordererId = req.user_id
                order.supplierName = ad.ownerName
                order.supplierId = ad.ownerId
                order.adId = id
                order.adTitle = ad.title
                if (ad.picturePaths.length > 0) order.adPicture = ad.picturePaths[0]
                await OrderModel.create(order)
                res.status(201).json({message: "Ordered"})
            }
        } catch (error){
            if (error.name === "ValidationError") res.status(400).json({message: "Invalid values"})
            else res.status(500).json({message: "Something went wrong."})
        }
    })

    app.delete("/order/:orderId", async (req, res) => {
        id = req.params.orderId
        try {
            const order = await OrderModel.findOne({_id: id}, ['ordererId', 'supplierId', 'phase'])
            if (!order) res.status(404).json({message: "Order not found."})
            else if (order.phase == 2) res.status(400).json({message: "You cannot delete an already sent order."})
            else if (req.user_id == order.ordererId || req.user_id == order.supplierId) {
                await OrderModel.deleteOne({_id: id})
                res.status(204).json({message: "Order deleted"})
            } else res.status(403).json({message: "You cannot delete someone else's order."})
        } catch (error){
            res.status(500).json({message: "Something went wrong."})
        }
    })

    app.post("/confirmOrder/:orderId", async (req, res) => {
        id = req.params.orderId
        try {
            const order = await OrderModel.findOne({_id: id}, ['phase', 'supplierId'])
            if (!order) res.status(404).json({message: "Order not found"})
            else if (order.supplierId != req.user_id) res.status(403).json({message: "You can only confirm your ad's orders"})
            else if (order.phase != 0) res.status(400).json({message: "You can only confirm unconfirmed orders"})
            else {
                await OrderModel.updateOne({_id: id}, {
                    $set: {
                        phase: 1
                    }
                })
                res.status(200).json({message: "Order confirmed"})
            }
        } catch (error){
            res.status(500).json({message: "Something went wrong."})
        }
    })

    app.post("/sendOrder/:orderId", async (req, res) => {
        id = req.params.orderId
        try {
            const order = await OrderModel.findOne({_id: id}, ['phase', 'supplierId'])
            if (!order) res.status(404).json({message: "Order not found"})
            else if (order.supplierId != req.user_id) res.status(403).json({message: "You can only send your ad's orders"})
            else if (order.phase != 1) res.status(400).json({message: "You can only send confirmed orders"})
            else {
                await OrderModel.updateOne({_id: id}, {
                    $set: {
                        phase: 2
                    }
                })
                res.status(200).json({message: "Order sent"})
            }
        } catch (error){
            res.status(500).json({message: "Something went wrong."})
        }
    })

    app.get("/myOrders", async (req, res) => {
        try {
            orders = await OrderModel.find({ordererId: req.user_id}, ['supplierName', 'supplierId',
                'phase', 'adId', 'adTitle', 'adPicture', 'quantity', 'address', 'city'])
            res.status(200).json({message: "OK", data: orders})
        } catch (error){
            res.status(500).json({message: "Something went wrong."})
        }
    })

    app.get("/orders", async (req, res) => {
        try {
            orders = await OrderModel.find({supplierId: req.user_id}, ['ordererName', 'ordererId',
                'phase', 'adId', 'adTitle', 'adPicture', 'quantity', 'address', 'city'])
            res.status(200).json({message: "OK", data: orders})
        } catch (error){
            res.status(500).json({message: "Something went wrong."})
        }
    })
}