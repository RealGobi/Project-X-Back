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
    res.status(201).json({
        messege:  'POST req to /products'
    })
});

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

router.patch('/:productId', (req, res, next) => {
    res.status(200).json({
        messege: 'Updated product'
    });
});

router.delete('/:productId', (req, res, next) => {
    res.status(200).json({
        messege: 'Deleted product'
    });
});

module.exports = router;
