const Message = require('../models/Msg.model')
const amqp = require('amqplib');
const connectRabbitMQ = async () => {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();
  const queueName = 'my_queue';
  const exchangeName = 'my_exchange';
  const exchangeType = 'direct';

  await channel.assertQueue(queueName);
  await channel.assertExchange(exchangeName, exchangeType);
  await channel.bindQueue(queueName, exchangeName, 'my_routing_key');
  return channel;
};
const channelPromise = connectRabbitMQ();

exports.send = async (req, res) => {
    // Validate request
    
    if (!req.body.text) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
      }
    // Create a std
    const message = new Message({
        text: req.body.text
        
    });
  
    // Save std in the database
    await message
      .save()
      .then(data => {
        res.send(data);
       
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the message."
        });
      });
      const conn = await amqp.connect('amqp://localhost');
      const channel = await conn.createChannel();
      await channel.assertQueue('msg');
     // await channel.sendToQueue('msg', Buffer.from('Hello World'));
      
      await channel.sendToQueue('msg', Buffer.from(JSON.stringify(message)));
      console.log("Sent 'Hello World!'");
      await channel.close();
      await conn.close();
  };
exports.senddirect = async (req, res) => {
    // Validate request
    
    if (!req.body.text) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
      }
    // Create a std
    /* const message = new Message({
        text: req.body.text
        
    }); */
  
    // Save std in the database
   /*  await message
      .save()
      .then(data => {
        res.send(data);
       
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the message."
        });
      }); */
     

      // Create a channel
      const message = req.body.text;
      const channel = await channelPromise;
      const exchangeName = 'my_exchange';
      const routingKey = 'my_routing_key';
      channel.assertExchange('direct_logs', 'direct', { durable: false });
      channel.publish('direct_logs', 'info', Buffer.from(JSON.stringify(message)));
      // channel.publish(exchangeName, routingKey, Buffer.from(message));
      console.log(`Sent message: ${message}`);
      res.send(`Message sent to RabbitMQ! : ${message}`);      
  };

exports.sendfanout = async (req, res) => {}
  
exports.sendtopic = async (req, res) => {}

exports.read = async (req, res) => {    
  const directExchange = 'direct_logs';
  const directQueue = 'direct_queue';
  const directRoutingKey = 'info';
  const conn = await amqp.connect('amqp://localhost');
  const channel = await conn.createChannel();
  channel.assertExchange(directExchange, 'direct', { durable: false });
  channel.assertQueue(directQueue, { exclusive: true });
  channel.bindQueue(directQueue, directExchange, directRoutingKey);
  console.log("Test")
  channel.consume(directQueue, (message) => {
    console.log(`Received message from direct exchange with routing key "${directRoutingKey}":`, JSON.parse(message.content.toString()));
  }, { noAck: true });
  };
  
exports.readfanout = async (req, res) => { }

exports.readtopic = async (req, res) => { }