function validateMessage(req, res, next) {
    const { userId, message } = req.body;
    if (!userId || !message) {
      return res.status(400).json({ error: 'User ID and message are required.' });
    }
    next();
  }
  
  module.exports = { validateMessage };