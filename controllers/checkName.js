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
            ).project({ _id:0, name:1, cuisine:1, fullAddress: {$concat: ['$address.building',' ','$address.street', ', ', '$address.zipcode']} })

            let restaurant = await results.toArray()

            if(restaurant.length == 1){
                res.render('rating', {oneResult:restaurant[0]})
            }
            else{
                console.log("plusieurs résultats à gérer")
            }
            // else if(restaurant.length > 1){
            //     res.render('ifSeveralResults', {restaurants:restaurant})
            // }
        }
        catch(err){
            return res.status(400).render('home')
        }
    }
}

module.exports = page