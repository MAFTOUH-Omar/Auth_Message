const amqp = require('amqplib');

// Connect to RabbitMQ instance
amqp.connect('amqp://localhost').then(async (connection) => {

  // Create a channel
  const channel = await connection.createChannel();

  // Direct exchange
  const directExchange = 'direct_logs';
  const directQueue = 'direct_queue';
  const directRoutingKey = 'info';

  channel.assertExchange(directExchange, 'direct', { durable: false });
  channel.assertQueue(directQueue, { exclusive: true });
  channel.bindQueue(directQueue, directExchange, directRoutingKey);
  channel.consume(directQueue, (message) => {
    console.log(`Received message from direct exchange with routing key "${directRoutingKey}":`, JSON.parse(message.content.toString()));
  }, { noAck: true });

  
  // Fanout exchange
  const fanoutExchange = 'logs';
  const fanoutQueue = 'fanout_queue';
  channel.assertExchange(fanoutExchange, 'fanout', { durable: false });
  channel.assertQueue(fanoutQueue, { exclusive: true });
  channel.bindQueue(fanoutQueue, fanoutExchange, '');
  channel.consume(fanoutQueue, (message) => {
    console.log('Received message from fanout exchange:', JSON.parse(message.content.toString()));
  }, { noAck: true });

  // Topic exchange
  const topicExchange = 'topic_logs';
  const topicQueue = 'topic_queue';
  const topicRoutingKey = 'info.*';
  channel.assertExchange(topicExchange, 'topic', { durable: false });
  channel.assertQueue(topicQueue, { exclusive: true });
  channel.bindQueue(topicQueue, topicExchange, topicRoutingKey);
  channel.consume(topicQueue, (message) => {
    console.log(`Received message from topic exchange with routing key "${message.fields.routingKey}":`, JSON.parse(message.content.toString()));
  }, { noAck: true });

  // Headers exchange
  const headersExchange = 'headers_logs';
  const headersQueue = 'headers_queue';
  const headersFilter = { type: 'test' };
  channel.assertExchange(headersExchange, 'headers', { durable: false });
  channel.assertQueue(headersQueue, { exclusive: true });
  channel.bindQueue(headersQueue, headersExchange, '', headersFilter);
  channel.consume(headersQueue, (message) => {
    console.log('Received message from headers exchange with headers:', message.properties.headers);
    console.log('Message content:', JSON.parse(message.content.toString()));
  }, { noAck: true });

}).catch((error) => {
  console.error('Error:', error);
  process.exit(1);
});
