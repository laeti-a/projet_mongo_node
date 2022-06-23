const RestaurantsModel = require("../Models/Restaurant")

const page = {
    exploreResult: async (req, res) => {
        const typeCuisine = await RestaurantsModel.aggregate([
            { $project: { cuisine: 1, } },
            { $group: {
                _id: '$cuisine'
            } },
        ]).sort({_id:1})

        const choixQuartier = await RestaurantsModel.aggregate([
            { $project: { borough: 1, } },
            { $group: {
                _id: '$borough'
            } },
        ]).sort({_id:1})

        res.render("explore", {cuisines:typeCuisine, quartiers:choixQuartier})
    }
}

module.exports = page