const { MongoClient } = require("mongodb")
const uri ="mongodb://localhost:27017"
const client = new MongoClient(uri)

const page = {
    restauResult: async (req, res) => {

        // Récupération des différentes données du formulaire
        const nameReq = req.body.nameResto

        // Mettre la première lettre du mot en majuscule
        let nameResto = nameReq[0].toUpperCase() + nameReq.substring(1)
        
        try{
            // Connexion à la base de données
            await client.connect()
            const database = client.db('ny')
            const restaurants = database.collection('restaurants')

            let restaurant = []
            
            // Récupération des restaurants en affichant seulement le nom, le quartier, et l'adresse complète
            let results = restaurants.aggregate([
                {$project: {_id:0, name:1, cuisine:1, borough:1, fullAddress: {$concat: ['$address.building',' ','$address.street', ', ', '$address.zipcode'] },}}
            ])

            let recupRestau = await results.toArray()
            
            // Si le nom renseigné dans le champ est inclu dans l'un ou plusieurs des noms des restaurants, on n'affiche que ces derniers
            recupRestau.forEach(doc =>{
                let name = doc.name

                if(name.includes(nameResto)){
                    restaurant.push(doc)
                }
            })

            res.render("restauResult", {restaurants:restaurant})
        }
        catch(err){
            console.log(err)
            return res.status(400).render('home')
        }
    }
}

module.exports = page