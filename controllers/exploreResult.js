const RestaurantsModel = require("../Models/Restaurant")

const page = {
    exploreResult: async (req, res) => {
        const { cuisine, quartier } = req.body

        try{
            const restaurant = await RestaurantsModel.find({cuisine:cuisine, borough:quartier},{_id:0, name:1, cuisine:1, 'address.building': 1,'address.street': 1,'address.zipcode': 1})
            
            res.render("exploreResult", {restaurants:restaurant})
        }
        catch(err){
            return res.status(400).render('home')
        }
    }
}

module.exports = page