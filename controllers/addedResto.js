const { MongoClient } = require("mongodb")
const uri ="mongodb://localhost:27017"
const client = new MongoClient(uri)

const page = {
    addedResto: async (req, res) => {

        // Récupération des différentes données du formulaire
        const nameResto = req.body.nameresto
        const batiment = req.body.building
        const rue = req.body.street
        const codePostal = req.body.zipcode
        const quartier = req.body.borough
        const typeCuisine  = req.body.cuisine

        // Mettre la première lettre du mot en majuscule
        let restoName = nameResto[0].toUpperCase() + nameResto.substring(1)

        try{
            // Connexion à la base de données
            await client.connect();
            const database = client.db('ny')
            const restaurants = database.collection('restaurants')

            // Création d'un chiffre random pour le mettre dans le champ "restaurant_id"
            let randomID = Math.floor(Math.random()*90000000) + 10000000;
            
            // Insertion d'un nouvel élément dans la base de données
            await restaurants.insertOne({
                address:{building: batiment, coord: [], street: rue, zipcode: codePostal},
                borough: quartier,
                cuisine: typeCuisine,
                grades:[],
                name: restoName,
                restaurant_id: randomID
            })

            // Retour sur la page de recherche des restos
            res.status(200).render('restos')
        }
        catch(err){
            return res.status(400).render('home')
        }
    }
}

module.exports = page