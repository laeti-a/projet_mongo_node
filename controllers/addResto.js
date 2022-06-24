// const { MongoClient } = require("mongodb")
// const uri ="mongodb://localhost:27017"
// const client = new MongoClient(uri)

// const page = {
//     addResto: async (req, res) => {
//         const { nameResto, batiment, rue, codePostal, quartier, typeCuisine } = req.body

//         try{
//             await client.connect();
//             const database = client.db('ny')
//             const restaurants = database.collection('restaurants')

//             let randomID = Math.floor(Math.random()*90000000) + 10000000;
            
//             let newResto = await restaurants.insertOne({
//                 address:{building: batiment, coord: [], street: rue, zipcode: codePostal},
//                 borough: quartier,
//                 cuisine: typeCuisine,
//                 grades:[],
//                 name: nameResto,
//                 restaurant_id: randomID
//             })

//             res.status(200).render('home')
//         }
//         catch(err){
//             return res.status(400).render('home')
//         }
        
//     }
// }

// module.exports = page