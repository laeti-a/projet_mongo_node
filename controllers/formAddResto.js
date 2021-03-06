const { MongoClient } = require("mongodb")
const uri ="mongodb://localhost:27017"
const client = new MongoClient(uri)

const page = {
    formAddResto: async (req, res) => {
        try{
            // Connexion à la base de données
            await client.connect();
            const database = client.db('ny')
            const restaurants = database.collection('restaurants')

            // Récupération de tous les types de cuisine
            const recupCuisine = restaurants.aggregate([
                { $project: { cuisine: 1 } },
                { $group: {
                    _id: '$cuisine'
                } },
            ]).sort({_id:1})

            let typeCuisine = await recupCuisine.toArray()

            // Récupération de tous les quartiers 
            const recupQuartier = restaurants.aggregate([
                { $project: { borough: 1 } },
                { $group: {
                    _id: '$borough'
                } },
            ]).sort({_id:1})

            let choixQuartier = await recupQuartier.toArray()
            

            res.render("formAddResto", {cuisines:typeCuisine, quartiers:choixQuartier})
        }
        catch(err){
            return res.status(400).render('home')
        }
    }
}

module.exports = page