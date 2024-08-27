const redis = require('redis');
const subscriber1 = redis.createClient()
const subscriber2 = redis.createClient()

subscriber1.subscribe('hoda channel');
subscriber2.subscribe('hoda channel');

subscriber1.on('message', (channel, message)=>{
    console.log(`sub1 recieved msg on channel ${channel}: ${message}`);
});
subscriber2.on('message', (channel, message)=>{
    console.log(`sub2 recieved msg on channel ${channel}: ${message}`);
});
// puplish message with a delay of 100ms
setTimeout(()=>{
    const publisher = redis.createClient();
    publisher.publish('hoda channel', 'This is the message');
}, 2000);
