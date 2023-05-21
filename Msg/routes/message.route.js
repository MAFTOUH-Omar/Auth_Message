const express = require('express');
const messageController = require('../controllers/message.controller');
const middleware = require('../middleware/validate.message');
const show=require ('../controllers/ShowMessage.controller');
const router = express.Router();

router.post('/messages', middleware.validateMessage, messageController.createMessage);
router.put('/messages/:id/seen', messageController.markMessageSeen);
router.get('/messages/show', show.getMsgWithUser);

module.exports = router;