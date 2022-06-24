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