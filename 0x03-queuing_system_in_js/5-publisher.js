const redis = require('redis');
const publisher = redis.createClient();

publisher.on('connect', ()=>{
    console.log('Redis client connected to the server');
});
publisher.on('error', (err)=>{
    console.error('Redis client not connected to the server:', err);
});

const publishMessage = (message, time)=>{
    setTimeout(()=>{
        console.log(`About to send ${message}`);
        publisher.publish('holberton school channel', message);
    }, time)
}

publishMessage("Holberton Student #1 starts course", 1000);
publishMessage("Holberton Student #2 starts course", 2000);
publishMessage("KILL_SERVER", 3000);
publishMessage("Holberton Student #3 starts course", 4000);
