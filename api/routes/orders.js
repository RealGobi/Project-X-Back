const express = require("express");
const router = express.Router();

const OrderController = require( '../controllers/order');

// Handle incoming GET requests to /orders
router.get("/", OrderController.orderGetAll);

router.post("/", OrderController.orderPost);

router.get("/:orderId", OrderController.singleOrder);

router.delete("/:orderId", OrderController.deleteOrder);

module.exports = router;