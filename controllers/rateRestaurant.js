const { MongoClient } = require("mongodb")
const uri ="mongodb://localhost:27017"
const client = new MongoClient(uri)

const page = {
    rateRestaurant: async (req, res) => {
        const nameResto = req.body.nomResto
        const grade = req.body.grade
        const score = req.body.score

        let dateNow = Date.now()

        try{
            await client.connect();
            const database = client.db('ny')
            const restaurants = database.collection('restaurants')
            
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

            res.status(200).render('restos')

        }
        catch(err){
            return res.status(400).render('home')
        }
        
    }
}

module.exports = page