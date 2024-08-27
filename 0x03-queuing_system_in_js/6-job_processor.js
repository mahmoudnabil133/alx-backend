const kue = require('kue');
const queue = kue.createQueue();

const sendNotification = (phoneNumber, message)=>{
    console.log(`Sending notification to ${phoneNumber}, with message: ${message}`)
};

queue.process('push_notification_code', (jop, done)=>{
    sendNotification(jop.data.phoneNumber, jop.data.message);
    done();
});
