const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./config/keys');

const app = express();

// Configure passport strategy for Google OAuth
passport.use(
	new GoogleStrategy(
		{
			clientID: keys.googleClientID,
			clientSecret: keys.googleClientSecret,
			callbackURL: '/oauth/google/callback'
		},
		(accessToken, refreshToken, profile, done) => {
			console.log('access token', accessToken);
			console.log('refresh token', refreshToken);
			console.log('profile', profile);
		}
	)
);
// Setup Google OAuth route
// 	- Ask for user profile info and email from google
app.get(
	'/oauth/google',
	passport.authenticate('google', {
		scope: ['profile', 'email']
	})
);

app.get('/oauth/google/callback', passport.authenticate('google'));

// Dynamic port setup
// 		- process.env.PORT for deployment
// 		- 5555 for localhost
const PORT = process.env.PORT || 5555;
app.listen(PORT);
