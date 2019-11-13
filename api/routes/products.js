const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/products');

// check auth
const checkAuth = require('../middleware/checkAuth');


//handeling routes

// Get
router.get('/', ProductController.getAllProducts);

// Post
router.post('/', checkAuth, ProductController.postProducts);

//Get by id
router.get('/:productId', ProductController.getSingleProducts);

// Patch $set-mongoose 
router.patch('/:productId', checkAuth, ProductController.updateProducts);

//Delete by id
router.delete('/:productId', checkAuth, ProductController.deleteProducts);

module.exports = router;
