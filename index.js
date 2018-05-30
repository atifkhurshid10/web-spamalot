const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
// Execute code in files. Nothing returned
require('./models/User');
require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express();
app.disable('x-powered-by');
app.set('trust proxy', 1); // trust first proxy
// Middleware setup
app.use(bodyParser.json());
app.use(
	cookieSession({
		maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day in milliseconds
		keys: [keys.cookieKey] // array of keys for cookie encryption
	})
);
app.use(passport.initialize());
app.use(passport.session());

// Routes
// Run arrow function in authRoutes.js
require('./routes/authRoutes')(app);
require('./routes/BillingRoutes')(app);

if (process.env.NODE_ENV === 'production') {
	// Find a route or asset in client/build if
	// not defined in express server
	app.use(express.static('client/build'));
	// If route not found, serve index.html
	const path = require('path');
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

// Dynamic port setup
// 		- process.env.PORT for deployment
// 		- 5555 for localhost
const PORT = process.env.PORT || 5555;
app.listen(PORT);
