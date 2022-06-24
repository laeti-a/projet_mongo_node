const { MongoClient } = require("mongodb")
const uri ="mongodb://localhost:27017"
const client = new MongoClient(uri)

const page = {
    checkName: async (req, res) => {
        const restoName = req.body.nameresto

        try{
            await client.connect();
            const database = client.db('ny')
            const restaurants = database.collection('restaurants')
            
            let results = restaurants.find(
                { name: restoName },
            ).project({ _id:0, name:1, cuisine:1, borough:1, 'address.street':1, fullAddress: {$concat: ['$address.building',' ','$address.street', ', ', '$address.zipcode']} })

            let restaurant = await results.toArray()

            if(restaurant.length == 1){
                res.render('rating', {oneResult:restaurant[0]})
            }
            else if(restaurant.length > 1){

                let restos = []
                
                restaurant.forEach(doc => {
                    let name = doc.name
                    let address = doc.address.street
                    let quartier = doc.borough

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