const { MongoClient } = require("mongodb")
const uri ="mongodb://localhost:27017"
const client = new MongoClient(uri)

const page = {
    rateRestaurant: async (req, res) => {

        // Récupération des différentes données du formulaire
        const nameResto = req.body.nomResto
        const address = req.body.infoResto
        const grade = req.body.grade
        const score = req.body.score

        // Récupération de la rue et du quartier pour être sûr de modifier le bon restaurant
        let streetResto
        let boroughResto
        if(address != undefined){
            let [street, borough] = address.split(', ')

            streetResto = street
            boroughResto = borough
        }

        // Date du jour à rajouter dans l'update
        let dateNow = Date.now()

        try{
            // Connexion à la base de données
            await client.connect();
            const database = client.db('ny')
            const restaurants = database.collection('restaurants')
            
            // Si la variable "address" est undefined, cela veut dire que l'on est dans le cas où un seul restaurant a la nom renseigné
            if(address == undefined){
                await restaurants.updateOne(
                    {name: nameResto},
                    {
                        $push: {
                            grades: {
                                $each: [{ date: {$date: dateNow}, grade: grade, score: score}]
                               
                            }
                        }
                    }
                )
            }
            // En revanche, si la valeur d'"address" est renseignée, il y a donc plusieurs restaurants avec le même nom, donc utilisation également de "streetResto" et "boroughResto" pour faire la modif sur le bon resto
            else{
                await restaurants.updateOne(
                    {name: nameResto, 'address.street': streetResto, borough: boroughResto},
                    {
                        $push: {
                            grades: {
                                $each: [{ date: {$date: dateNow}, grade: grade, score: score}]
                               
                            }
                        }
                    }
                )
            }
            

            res.status(200).render('restos')
        }
        catch(err){
            return res.status(400).render('home')
        }
        
    }
}

module.exports = page