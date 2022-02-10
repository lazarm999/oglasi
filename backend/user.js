const UserModel = require('./models/userModel')
const AdModel = require('./models/adModel');
const OrderModel = require('./models/orderModel');
const RatingModel = require('./models/ratingModel')

module.exports = function(app, conn){
    // {firstName, lastName, phone}
    app.put("/updateProfile", async (req, res) => {
        const session = await conn.startSession();
        try {
            session.startTransaction()

            var user = await UserModel.findOneAndUpdate(
                {_id: req.user_id},
                {$set: req.body},
                {runValidators: true, new: true})
            await AdModel.updateMany({ownerId: req.user_id}, {
                $set: {
                    ownerName: user.firstName + " " + user.lastName
                }
            })
            await OrderModel.updateMany({ordererId: req.user_id}, {
                $set: {
                    ordererName: user.firstName + " " + user.lastName
                }
            })
            await OrderModel.updateMany({supplierId: req.user_id}, {
                $set: {
                    supplierName: user.firstName + " " + user.lastName
                }
            })
            await RatingModel.updateMany({raterId: req.user_id}, {
                $set: {
                    raterName: user.firstName + " " + user.lastName
                }
            })
            
            await session.commitTransaction()
            res.status(204).json({message: "User updated"})
        } catch (error){
            await session.abortTransaction()
            if (error.name === "ValidationError") res.status(400).json({message: "Invalid values"})
            else res.status(500).json({message: "Something went wrong."})
        }
        session.endSession()
    })
}