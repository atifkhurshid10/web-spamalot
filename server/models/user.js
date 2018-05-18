const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');
const { Schema } = mongoose; // Destructuring : Schema = mongoose.Schema

const userSchema = new Schema({
	googleID: String,
	twitterID: String,
	linkedinID: String
});

userSchema.plugin(findOrCreate);

// Create collection 'users' with schema userSchema if DNE
mongoose.model('users', userSchema);
