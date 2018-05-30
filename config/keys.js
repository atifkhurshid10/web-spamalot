if (process.env.NODE_ENV === 'production') {
	// In production - Return prod keys
	module.exports = require('./prod');
} else {
	// In development - Return dev keys
	module.exports = require('./dev');
}
