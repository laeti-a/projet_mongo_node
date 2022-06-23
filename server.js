const routes = require('./router.js')
const express = require('express')
const mongoose = require("mongoose")
const path = require('path')
const { fileURLToPath } = require('url')

// Server config
const app = express()
const port = 3000

// Connexion à la BDD MongoDB
mongoose
  .connect('mongodb://localhost:27017/ny', {
      useNewUrlParser: true,
      useUnifiedTopology: true
  }).then(startApp)


app.set("view engine", "pug")

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: false }));

// Routes
app.use(routes)

// Démarrage de l'application Node.js
async function startApp() {
    console.log('Connexion à la base MongoDB initialisée')

    app.listen(port)
    console.log(`http://localhost:${port}/home`)
}