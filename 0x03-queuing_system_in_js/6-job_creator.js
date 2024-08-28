const kue = require('kue');
const queue = kue.createQueue();

const jop = queue.create('push_notification_code', {
    phoneNumber: '4153518782',
    message: 'This is the code to verify your account'
})
  .save((err)=>{
    if(!err){
        console.log(`Notification jop created: ${jop.id}`)
    }
  });

jop.on('complete', ()=>{
    console.log('Notification jop completed');
});
jop.on('failed', ()=>{
  console.log('Notification jop failed');
});
