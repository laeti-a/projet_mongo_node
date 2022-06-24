const routes = require('./router.js')
const express = require('express')
const path = require('path')

// Server config
const app = express()
const port = 3000

app.set("view engine", "pug")

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: false }));

// Routes
app.use(routes)

app.listen(port)
console.log(`http://localhost:${port}`)



/*

address: {"building": "1007", "coord": [-73.856077, 40.848447], "street": "Morris Park Ave", "zipcode": "10462"}, 

borough: "Bronx", 

cuisine: "Bakery", 

grades: [{"date": {"$date": 1393804800000}, "grade": "A", "score": 2}, {"date": {"$date": 1378857600000}, "grade": "A", "score": 6}, {"date": {"$date": 1358985600000}, "grade": "A", "score": 10}, {"date": {"$date": 1322006400000}, "grade": "A", "score": 9}, {"date": {"$date": 1299715200000}, "grade": "B", "score": 14}], 

name: "Morris Park Bake Shop", 

restaurant_id: "30075445"

*/