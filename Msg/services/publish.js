const amqp = require('amqplib');

// Connect to RabbitMQ instance
amqp.connect('amqp://localhost').then(async (connection) => {

  // Create a channel
  const channel = await connection.createChannel();

  // Define message to send
  const message = { type: 'test', content: 'Hello, world!' };

  // Direct exchange
  channel.assertExchange('direct_logs', 'direct', { durable: false });
  channel.publish('direct_logs', 'info', Buffer.from(JSON.stringify(message)));

  // Fanout exchange
  channel.assertExchange('logs', 'fanout', { durable: false });
  channel.publish('logs', '', Buffer.from(JSON.stringify(message)));

  // Topic exchange
  channel.assertExchange('topic_logs', 'topic', { durable: false });
  channel.publish('topic_logs', 'info.test', Buffer.from(JSON.stringify(message)));

  // Headers exchange
  channel.assertExchange('headers_logs', 'headers', { durable: false });
  channel.publish('headers_logs', '', Buffer.from(JSON.stringify(message)), { headers: { type: 'test' } });

  console.log('Sent message:', message);

  // Close connection after a short delay
  setTimeout(() => {
    connection.close();
    process.exit(0);
  }, 500);
  
}).catch((error) => {
  console.error('Error:', error);
  process.exit(1);
});
