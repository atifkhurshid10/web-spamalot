const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
// Execute code in files. Nothing returned
require('./models/user');
require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express();

// Setting up cookie-session and passport middleware
app.use(
	cookieSession({
		maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day in milliseconds
		keys: [keys.cookieKey] // array of keys for cookie encryption
	})
);
app.use(passport.initialize());
app.use(passport.session());

// Run arrow function in authRoutes.js
require('./routes/authRoutes')(app);

// Dynamic port setup
// 		- process.env.PORT for deployment
// 		- 5555 for localhost
const PORT = process.env.PORT || 5555;
app.listen(PORT);
