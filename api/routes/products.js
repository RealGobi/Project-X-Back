const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product = require('../models/products');

// Get
router.get('/', (req, res, next) => {
    Product.find()
    .exec()
    .then(docs => {
        console.log(docs);
        res.status(200).json(docs);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

// Post
router.post('/', (req, res, next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });
    product
    .save()
    .then(result => {
        console.log(result)
        res.status(201).json({
            messege:  'POST req to /products',
            createdProduct: result
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error:err
        });
    });
    })
});

//Get by id
router.get('/:productId', (req, res, next) => {
// get product id from url
    const id = req.params.productId; 
    Product.findById(id)
    .exec()
    .then(doc => {
        console.log(doc);
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
});

// Patch $set-mongoose 
router.patch('/:productId', (req, res, next) => {
    const id = req.params.productId;
    const updateOps = {};
// look only att feild that has change ex. to update { "propName": "name", "value": "jimmy" },{ "propName": "price", "value": "999" }
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Product.update({_id: id}, { $set: updateOps })
    .exec()
    .then( result => {
        console.log(result);
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error:err
        });
    });
});

//Delete by id
router.delete('/:productId', (req, res, next) => {
    const id = req.params.productId
    Product.remove({_id: id})
    .exec()
    .then(result => {
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error:err
        });
    });
});

module.exports = router;
