const express = require('express');
const router = express.Router();
const RecipeController = require('../controllers/recipes');

// check auth
const checkAuth = require('../middleware/checkAuth');


//handeling routes

// Get
router.get('/', RecipeController.getAllRecipes);

// Post
router.post('/', checkAuth, RecipeController.postRecipes);

//Get by id
router.get('/:recipeId', RecipeController.getSingleRecipes);

// Patch $set-mongoose 
router.patch('/:recipeId', checkAuth, RecipeController.updateRecipes);

//Delete by id
router.delete('/:recipeId', checkAuth, RecipeController.deleteRecipes);

module.exports = router;
