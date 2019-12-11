const mongoose = require('mongoose');
const Recipe = require('../models/recipes');

exports.getAllRecipes = (req, res) => {
    Recipe.find()
      .then(items => res.json(items));
  };

exports.postRecipes = (req, res, next) => {
    const recipe = new Recipe({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        description: req.body.description,
        category1: req.body.category1,
        category2: req.body.category2,
        imagesLink: req.body.imagesLink,
        time: req.body.time,
        ingredients: req.body.ingredients,
        instructions: req.body.instructions,
        allergy: req.body.allergy,
        rating: req.body.rating,
        foodType: req.body.foodType,
    });
    recipe
    .save()
    .then(result => {
        console.log(result);
        res.status(201).json({
            messege:  'Created successfully',
            createdRecipe: {
                _id: result._id,
                title: result.title,
                description: result.description,
                category1: result.category1,
                category2: result.category2,
                imagesLink: result.imagesLink,
                time: result.time,
                ingredients: result.ingredients,
                instructions: result.instructions,
                allergy: result.allergy,
                rating: result.rating,
                foodType: result.foodType,
            }
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error:err
        });
    });
}

exports.updateRecipes = (req, res, next) => {
    const id = req.params.recipeId;
    const updateOps = {};
// look only att feild that has change ex. to update[ { "propName": "name", "value": "jimmy" },{ "propName": "price", "value": "999" }]
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Recipe.updateOne({_id: id}, { $set: updateOps })
    .exec()
    .then(
        res.status(200).json({
            message: 'Recipe Updated',
        })
    )
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error:err
        });
    });
}

exports.getSingleRecipes = (req, res, next) => {
    // get recipe id from url
        const id = req.params.recipeId; 
        Recipe.findById(id)
        .select('name price _id')
        .exec()
        .then(doc => {
            console.log('From DB', doc);
            if(doc) {
                res.status(200).json(doc);
            } else {
                res.status(404).json({
                    message: 'No valid Id in database.'
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err})
        });
    }

exports.deleteRecipes =  (req, res, next) => {
    const id = req.params.recipeId
    Recipe.deleteOne({_id: id})
    .exec()
    .then(
        res.status(200).json({
            message: "Deleted Successfully"
        })
    )
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error:err
        });
    });
}