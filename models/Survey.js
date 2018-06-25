const mongoose = require('mongoose');
//const findOrCreate = require('mongoose-findorcreate');
const { Schema } = mongoose; // Destructuring : Schema = mongoose.Schema
const RecipientSchema = require('./Recipient');

const surveySchema = new Schema({
  title: String,
  body: String,
  subject: String,
  recipients: [RecipientSchema],
  redirectURL: String,
  yes: { type: Number, default: 0 },
  no: { type: Number, default: 0 },
  _user: { type: Schema.Types.ObjectId, ref: 'User' },
  dateSent: Date,
  lastResponded: Date
});

//userSchema.plugin(findOrCreate);

// Create collection 'users' with schema userSchema if DNE
mongoose.model('Surveys', surveySchema);
