const express = require('express')
const route = express.Router()
const message = require('../controllers/rabbitMessage.controller')

route.post('/send', message.send);

route.post('/senddirect', message.senddirect);

route.get('/read', message.read);

module.exports = route;