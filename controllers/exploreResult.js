const { MongoClient } = require("mongodb")
const uri ="mongodb://localhost:27017"
const client = new MongoClient(uri)

const page = {
    exploreResult: async (req, res) => {
        const { cuisine, quartier } = req.body

        try{
            await client.connect();
            const database = client.db('ny')
            const restaurants = database.collection('restaurants')
            
            let results = restaurants.aggregate([
                {$match: {cuisine:cuisine, borough:quartier}},
                {$project: {_id:0, name:1, cuisine:1, fullAddress: {$concat: ['$address.building',' ','$address.street', ', ', '$address.zipcode'] },}}
            ])

            let restaurant = await results.toArray()

            res.render("exploreResult", {restaurants:restaurant, quartier:quartier, cuisine:cuisine})
        }
        catch(err){
            return res.status(400).render('home')
        }
    }
}

module.exports = page