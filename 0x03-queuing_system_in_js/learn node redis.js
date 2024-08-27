const redis = require('redis');
const { get } = require('request');
const { promisify } = require('util');
const client = redis.createClient();

client.on('connect', () => {
  console.log('Redis client connected to the server');
});

client.on('error', (err) => {
  console.error(`Redis client not connected to the server: ${err}`);
});
client.set('HolbertonSchools', 'Portland, San Francisco, Seattle');

// 1)
client.get('HolbertonSchools', (error, reply) => {
  console.log(reply);
});

// 2)
const getAsync = promisify(client.get).bind(client);

// async operation to get from redis db
getAsync('HolbertonSchools').then((reply) => console.log(reply));
