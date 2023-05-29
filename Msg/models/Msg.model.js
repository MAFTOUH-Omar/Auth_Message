const mongoose = require('mongoose');
const messageSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
  message: String,
  created: { type: Date, default: Date.now },
  seen: { type: Boolean, default: false }
});

module.exports = mongoose.model('Message', messageSchema);