const express = require('express')
const page = require('./controllers/home')
const page2 = require('./controllers/restos')
const page3 = require('./controllers/explore')
const page4 = require('./controllers/rating')
const page5 = require('./controllers/formAddResto')


const page6 = require('./controllers/exploreResult')

// Router
const router = (() => {
	const apiRouter = express.Router()

	// Get form data contact FabFrenchInsurance 
	apiRouter.route('/').get(page.home)

	apiRouter.route('/restos').get(page2.restos)

	apiRouter.route('/explore').get(page3.explore)

	apiRouter.route('/rating').get(page4.rating)

	apiRouter.route('/addRestaurant').get(page5.formAddResto)


	apiRouter.route('/').post(page6.exploreResult)


	return apiRouter
})()

module.exports = router