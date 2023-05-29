const express = require('express')
const app = express();
const MsgRoute = require('./routes/message.route') 
const RabbitMqMessage = require('./routes/rabbitMessage.route') 
const db = require("./config/database")
const amqp = require('amqplib')
const gitlabRoute = require('./routes/gitlab.route')
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use('/msg',MsgRoute);
app.use('/rabbit',RabbitMqMessage);
app.use('/gitlab', gitlabRoute);
db.connect();
// function read () {    
//     const directExchange = 'direct_logs';
//     const directQueue = 'direct_queue';
//     const directRoutingKey = 'info';
//     const conn =  amqp.connect('amqp://localhost').then();
//     const channel =  conn.createChannel();
//     channel.assertExchange(directExchange, 'direct', { durable: false });
//     channel.assertQueue(directQueue, { exclusive: true });
//     channel.bindQueue(directQueue, directExchange, directRoutingKey);
//     console.log("Test")
//     channel.consume(directQueue, (message) => {
//       console.log(`Received message from direct exchange with routing key "${directRoutingKey}":`, JSON.parse(message.content.toString()));
//     }, { noAck: true });
//     };
//     read()
app.listen(process.env.APP_PORT);