const { MongoClient } = require("mongodb")
const uri ="mongodb://localhost:27017"
const client = new MongoClient(uri)

const page = {
    addedResto: async (req, res) => {
        const nameResto = req.body.nameresto
        const batiment = req.body.building
        const rue = req.body.street
        const codePostal = req.body.zipcode
        const quartier = req.body.borough
        const typeCuisine  = req.body.cuisine

        // Mettre la première lettre du mot en majuscule
        let restoName = nameResto[0].toUpperCase() + nameResto.substring(1)

        try{
            await client.connect();
            const database = client.db('ny')
            const restaurants = database.collection('restaurants')

            let randomID = Math.floor(Math.random()*90000000) + 10000000;
            
            await restaurants.insertOne({
                address:{building: batiment, coord: [], street: rue, zipcode: codePostal},
                borough: quartier,
                cuisine: typeCuisine,
                grades:[],
                name: restoName,
                restaurant_id: randomID
            })

            res.status(200).render('restos')
        }
        catch(err){
            return res.status(400).render('home')
        }
    }
}

module.exports = page