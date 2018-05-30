const passport = require('passport'); // Original passport

module.exports = app => {
	// Setup Google OAuth routes
	// 	- Ask for user profile info and email from google
	app.get(
		'/oauth/google',
		passport.authenticate('google', {
			scope: ['profile', 'email']
		})
	);
	app.get(
		'/oauth/google/callback',
		passport.authenticate('google'),
		(req, res) => {
			res.redirect('/surveys');
		}
	);

	// Setup twitter OAuth routes
	app.get('/oauth/twitter', passport.authenticate('twitter'));
	app.get(
		'/oauth/twitter/callback',
		passport.authenticate('twitter'),
		(req, res) => {
			res.redirect('/surveys');
		}
	);

	// Setup linkedin OAuth routes
	app.get('/oauth/linkedin', passport.authenticate('linkedin'));
	app.get(
		'/oauth/linkedin/callback',
		passport.authenticate('linkedin'),
		(req, res) => {
			res.redirect('/surveys');
		}
	);

	app.get('/api/logout', (req, res) => {
		req.logout();
		res.redirect('/');
	});

	// Get current user's mongoose model instance
	app.get('/api/current_user', (req, res) => {
		res.send(req.user);
	});
};
