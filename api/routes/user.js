const express = require("express");
const router = express.Router();

const UserController = require('../controllers/user');
const checkAuth = require('../middleware/checkAuth');

router.post('/signup', UserController.signUpUser);

router.post('/login', UserController.loginUser)

router.delete('/:userId', checkAuth, UserController.deleteUser);

module.exports = router;