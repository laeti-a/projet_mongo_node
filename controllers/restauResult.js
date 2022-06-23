const RestaurantsModel = require("../Models/Restaurant")

const page = {
    restauResult: async (req, res) => {
        const nameReq = req.body.nameResto

        // Mettre la première lettre du mot en majuscule
        let nameResto = nameReq[0].toUpperCase() + nameReq.substring(1)

        try{
            let restaurant = []
            
            let recupRestau = await RestaurantsModel.find({},{_id:0, name:1, cuisine:1, 'address.building': 1,'address.street': 1,'address.zipcode': 1})

            recupRestau.forEach(doc =>{
                let name = doc.name

                if(name.includes(nameResto)){
                    restaurant.push(doc)
                }
            })

            res.render("restauResult", {restaurants:restaurant})
        }
        catch(err){
            return res.status(400).render('home')
        }
    }
}

module.exports = page


// nom, cuisine, adresse complète