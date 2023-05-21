const Message = require('../models/Msg.model');
const User = require('../../Auth/models/user.model');

async function createMessage(req, res) {
  const { userId, message } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }
    const newMessage = new Message({ user, message });
    await newMessage.save();
    return res.status(201).json({ message: 'Message sent successfully.' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

async function markMessageSeen(req, res) {
  const messageId = req.params.id;
  try {
    const message = await Message.findById(messageId);
    if (!message) {
      return res.status(404).json({ error: 'Message not found.' });
    }
    message.seen = true;
    await message.save();
    return res.status(200).json({ message: 'Message marked as seen.' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

module.exports = { createMessage, markMessageSeen };