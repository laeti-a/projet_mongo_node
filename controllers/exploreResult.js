const { MongoClient } = require("mongodb")
const uri ="mongodb://localhost:27017"
const client = new MongoClient(uri)

const page = {
    exploreResult: async (req, res) => {

        // Récupération des différentes données du formulaire
        const { cuisine, quartier } = req.body

        try{
            // Connexion à la base de données
            await client.connect();
            const database = client.db('ny')
            const restaurants = database.collection('restaurants')
            
            // Récupération de tous les restaurants dont le nom et le quartier correspondent à ceux renseignés dans le formulaire
            let results = restaurants.aggregate([
                {$match: {cuisine:cuisine, borough:quartier}},
                {$project: {_id:0, name:1, cuisine:1, fullAddress: {$concat: ['$address.building',' ','$address.street', ', ', '$address.zipcode'] },}}
            ])

            let restaurant = await results.toArray()

            // Passage en paramètre des données récupérées pour les renvoyer sur la page
            res.render("exploreResult", {restaurants:restaurant, quartier:quartier, cuisine:cuisine})
        }
        catch(err){
            return res.status(400).render('home')
        }
    }
}

module.exports = page