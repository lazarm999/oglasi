const LookupsModel = require('./models/lookupsModel')

async function getLookupByType(req, res, type) {
    try {
        let d = await LookupsModel.findOne({type: type}, 'data')
        res.status(200).json({message: "OK", data: d.data})
    } catch(error) {
        res.status(500).json({message: "Something went wrong."})
    }
}

module.exports = function(app){

    app.get("/getLocations/", async (req, res) => {
        getLookupByType(req, res, "locations")
    })

    app.get("/getCategories/", async (req, res) => {
        getLookupByType(req, res, "categories")
    })
}