const express = require('express')
const app = express();
const MsgRoute = require('./routes/message.route') 
const RabbitMqMessage = require('./routes/rabbitMessage.route') 
const db = require("./config/database")
const amqp = require('amqplib')
const gitlabRoute = require('./routes/gitlab.route')
const axios = require('axios')
const { MongoClient } = require('mongodb')
const cors = require('cors');

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use('/msg',MsgRoute);
app.use('/rabbit',RabbitMqMessage);
app.use('/gitlab', gitlabRoute);
db.connect();
app.listen(process.env.APP_PORT);