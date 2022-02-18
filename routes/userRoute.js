const express = require('express');
const {
	registerUser,
	getUsers,
	loginUser,
} = require('../controller/userController');
const protect = require('../middleware/authmiddleware');
const router = express.Router();

router.route('/').post(registerUser).get(protect, getUsers);
router.post('/login', loginUser);

module.exports = router;
