const express = require('express');

const productController = require('../controllers/productController.js')
const reviewController = require('../controllers/reviewController.js');

const router = require('express').Router()

//all routes
router.post('/addProduct', productController.addProduct)
router.get('/allProducts', productController.getAllProducts)
router.get('/published', productController.getPublishedProduct)


//this should be above the request with id because if they will be below then it will treat getAllReview as request with ID
router.post('/addReview/:id', reviewController.addReview)
router.get('/allReviews', reviewController.getAllReviews)

//get product review
router.get('/getProductReview/:id', productController.getProductReviews)

router.get('/:id', productController.getOneProduct)
router.put('/:id', productController.updateProduct)
router.delete('/:id', productController.deleteProduct)




module.exports = router