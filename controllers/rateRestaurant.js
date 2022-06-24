const { MongoClient } = require("mongodb")
const uri ="mongodb://localhost:27017"
const client = new MongoClient(uri)

const page = {
    rateRestaurant: async (req, res) => {
        const grade = req.body.grade
        const score = req.body.score

        try{
            await client.connect();
            const database = client.db('ny')
            const restaurants = database.collection('restaurants')
            
            

            
        }
        catch(err){
            return res.status(400).render('home')
        }
        
    }
}

module.exports = page