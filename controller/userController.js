const generateToken = require('../utils/generateToken');
const User = require('../models/UserModel');

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public

exports.loginUser = async (req, res) => {
	const { email, password } = req.body;

	const user = await User.findOne({ email });

	if (user && (await user.matchPassword(password))) {
		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			token: generateToken(user._id),
		});
	} else {
		res.status(401);
		throw new Error('Invalid email or password');
	}
};

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
exports.registerUser = async (req, res) => {
	const { name, email, password } = req.body;

	const userExits = await User.findOne({ email });

	if (userExits) {
		res.status(400);
		throw new Error('User Already Exists');
	}

	const user = await User.create({
		name,
		email,
		password,
	});

	if (user) {
		res.status(201).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			token: generateToken(user._id),
		});
	} else {
		res.status(400);
		throw new Error('Invalid user data');
	}
};

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin

exports.getUsers = async (req, res) => {
	const users = await User.find({});
	res.json(users);
};
