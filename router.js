const express = require('express')

const page = require('./controllers/home')
const page2 = require('./controllers/restos')
const page3 = require('./controllers/explore')
const page4 = require('./controllers/rating')
const page5 = require('./controllers/formAddResto')

const page6 = require('./controllers/exploreResult')
const page7 = require('./controllers/restauResult')
const page8 = require('./controllers/addedResto')
const page9 = require('./controllers/checkName')
const page10 = require('./controllers/rateRestaurant')

// Router
const router = (() => {
	const apiRouter = express.Router()

	// Get data
	apiRouter.route('/').get(page.home)

	apiRouter.route('/restos').get(page2.restos)

	apiRouter.route('/explore').get(page3.explore)

	apiRouter.route('/rating').get(page4.rating)

	apiRouter.route('/addRestaurant').get(page5.formAddResto)

	// Post data
	apiRouter.route('/exploreResult').post(page6.exploreResult)

	apiRouter.route('/restosResult').post(page7.restauResult)

	apiRouter.route('/restoAdded').post(page8.addedResto)

	apiRouter.route('/checkName').post(page9.checkName)

	apiRouter.route('/rateRestaurant').post(page10.rateRestaurant)


	return apiRouter
})()

module.exports = router