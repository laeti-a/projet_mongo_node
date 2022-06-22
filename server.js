import routes from './router.js'
import express from 'express'
import mongoose from"mongoose"
import session from 'express-session'
import MongoStore from 'connect-mongo'
import path from 'path'
import { fileURLToPath } from 'url'

// Server config

// Connexion à la BDD MongoDB
mongoose
  .connect('mongodb://localhost:27017/ny', {
      useNewUrlParser: true,
      useUnifiedTopology: true
  }).then(startApp)





const __dirname = path.dirname(fileURLToPath(import.meta.url))




// Routes
app.use(routes)

async function startApp() {
    console.log('Connexion à la base MongoDB initialisée')

    app.listen(port)
}