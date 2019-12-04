const mongoose = require('mongoose');
const Product = require('../models/products');

exports.getAllProducts = (req, res) => {
    Product.find()
      .then(items => res.json(items));
  };

exports.postProducts = (req, res, next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });
    product
    .save()
    .then(result => {
        console.log(result);
        res.status(201).json({
            messege:  'Created successfully',
            createdProduct: {
                name: result.name,
                price: result.price,
                _id: result._id,
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

exports.updateProducts = (req, res, next) => {
    const id = req.params.productId;
    const updateOps = {};
// look only att feild that has change ex. to update[ { "propName": "name", "value": "jimmy" },{ "propName": "price", "value": "999" }]
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Product.updateOne({_id: id}, { $set: updateOps })
    .exec()
    .then(
        res.status(200).json({
            message: 'Product Updated',
        })
    )
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error:err
        });
    });
}

exports.getSingleProducts = (req, res, next) => {
    // get product id from url
        const id = req.params.productId; 
        Product.findById(id)
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

exports.deleteProducts =  (req, res, next) => {
    const id = req.params.productId
    Product.deleteOne({_id: id})
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