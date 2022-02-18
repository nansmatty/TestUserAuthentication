const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');

const protect = async (req, res, next) => {
	let token;
	if (req?.headers?.authorization?.startsWith('Bearer')) {
		try {
			token = req.headers.authorization.split(' ')[1];

			const decode = jwt.verify(token, process.env.JWT_SECRET);

			console.log(decode);

			req.user = await User.findById(decode.id).select('-password');

			next();
		} catch (error) {
			res.status(401);
			throw new Error('Not authorized token failed');
		}
	}

	if (!token) {
		res.status(401);
		throw new Error('Not authorized token failed');
	}
};

module.exports = protect;
