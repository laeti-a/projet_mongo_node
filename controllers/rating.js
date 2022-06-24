// const { MongoClient } = require("mongodb")
// const uri ="mongodb://localhost:27017"
// const client = new MongoClient(uri)

const page = {
    rating: (req, res) => {
        res.render("rating")
    }
}

module.exports = page