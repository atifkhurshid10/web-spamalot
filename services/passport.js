const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;
const LinkedInStrategy = require('passport-linkedin').Strategy;
const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');
const keys = require('../config/keys');

const User = mongoose.model('Users'); // Assigning model class to User

// Create cookie from Mongoose model instance user
passport.serializeUser((user, done) => {
	// user.id is an automatically generated id from MongoDB.
	// Using id as cookie allows us to implement multiple OAuths
	// as it is common to all objects in the database
	return done(null, user.id);
});
// Create Mongoose model instance from cookie userID
// Using id as cookie also makes deserializing query simple
// as we simply search by id
passport.deserializeUser((id, done) => {
	User.findById(id).then(user => {
		return done(null, user);
	});
});

// Configure passport strategy for Google OAuth
passport.use(
	new GoogleStrategy(
		{
			// Get these from google+ api
			clientID: keys.googleClientID,
			clientSecret: keys.googleClientSecret,
			callbackURL: '/oauth/google/callback',
			proxy: true
		},
		(accessToken, refreshToken, profile, done) => {
			// Find ore create a user in MongoDB collection with googleID
			User.findOrCreate({ googleID: profile.id }, (err, user) => {
				return done(err, user);
			});
		}
	)
);

passport.use(
	new TwitterStrategy(
		{
			consumerKey: keys.twitterClientID,
			consumerSecret: keys.twitterClientSecret,
			callbackURL: '/oauth/twitter/callback',
			proxy: true
		},
		(accessToken, refreshToken, profile, done) => {
			User.findOrCreate({ twitterID: profile.id }, (err, user) => {
				return done(err, user);
			});
		}
	)
);

passport.use(
	new LinkedInStrategy(
		{
			consumerKey: keys.linkedinClientID,
			consumerSecret: keys.linkedinClientSecret,
			callbackURL: '/oauth/linkedin/callback',
			proxy: true
		},
		(accessToken, refreshToken, profile, done) => {
			User.findOrCreate({ linkedinID: profile.id }, (err, user) => {
				return done(err, user);
			});
		}
	)
);
