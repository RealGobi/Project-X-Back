const express = require('express');
const router = express.Router();

// Get
router.get('/', (req, res, next) => {
    res.status(200).json({
        messege: 'GET req to /products'
    })
});

// Post
router.post('/', (req, res, next) => {
    const product = {
        name: req.body.name,
        price: req.body.price
    };
    res.status(201).json({
        messege:  'POST req to /products',
        createdProduct: product
    })
});

//Get by id
router.get('/:productId', (req, res, next) => {
    const id = req.params.productId; 
    if (id === 'special') {
        res.status(200).json({
            messege: 'Special ID for singel view',
            id: id
        });
    } else {
        res.status(200).json({
            messege: 'You passed an ID'
        });
    }
});

// Patch
router.patch('/:productId', (req, res, next) => {
    res.status(200).json({
        messege: 'Updated product'
    });
});

//Delete by id
router.delete('/:productId', (req, res, next) => {
    res.status(200).json({
        messege: 'Deleted product'
    });
});

module.exports = router;
