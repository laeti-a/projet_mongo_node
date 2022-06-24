const { MongoClient } = require("mongodb")
const uri ="mongodb://localhost:27017"
const client = new MongoClient(uri)

const page = {
    checkName: async (req, res) => {
        
        // Récupération des différentes données du formulaire
        const restoName = req.body.nameresto

        try{
            // Connexion à la base de données
            await client.connect();
            const database = client.db('ny')
            const restaurants = database.collection('restaurants')
            
            // Récupération du.des restaurant.s dont le nom correspond à celui renseigné dans le champ du formulaire
            let results = restaurants.find(
                { name: restoName },
            ).project({ _id:0, name:1, cuisine:1, borough:1, 'address.street':1, fullAddress: {$concat: ['$address.building',' ','$address.street', ', ', '$address.zipcode']} })

            let restaurant = await results.toArray()

            // Si un seul résultat est trouvé, renvoi vers la page pour noter le restaurant en question
            if(restaurant.length == 1){
                res.render('rating', {oneResult:restaurant[0]})
            }
            // Si plusieurs restaurants avec ce nom sont trouvés, renvoi vers la page avec un select pour savoir de quel restaurant il s'agit, puis possibilité de le noter
            else if(restaurant.length > 1){

                let restos = []
                
                restaurant.forEach(doc => {
                    let name = doc.name
                    let address = doc.address.street
                    let quartier = doc.borough

                    // Concaténation du nom de la rue et du quartier pour pouvoir les utiliser dans le select et ensuite les récupérer pour mettre à jour le bon restaurant
                    let fullInfo = address + ", " + quartier

                    restos.push({"name" : name, "info" : fullInfo})
                })

                res.render('rating', {severalResults:restos})
            }
        }
        catch(err){
            return res.status(400).render('home')
        }
    }
}

module.exports = page