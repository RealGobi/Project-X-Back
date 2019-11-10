const express = require('express');
const router = express.Router();
//Get
router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'order was fetched'
    });
});

//Get by id
router.get('/:orderId', (req, res, next) => {
    res.status(200).json({
        message: 'order details',
        orderId: req.params.orderId
    });
});

//Post
router.post('/', (req, res, next) => {
    const order = {
        productId: req.body.productId,
        quantity: req.body.quantity
    };
    res.status(201).json({
        message: 'order was created',
        order: order
    });
});

//Delete by id
router.delete('/:orderId', (req, res, next) => {
    res.status(200).json({
        message: 'order deleted',
        orderId: req.params.orderId
    });
});

module.exports = router;
