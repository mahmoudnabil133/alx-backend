const kue = require('kue');
const queue = kue.createQueue();
const jop = queue.create('email', {
    title: 'welcome email',
    to:'kmal@gmail.com',
    template: '<h1>welcome-email-template</h1>'
})
.attempts(5)
.backoff({type: 'fixed', delay: 5000})
.save((err)=>{
    if (!err) console.log(`jop created with id ${jop.id}`)
})


const sendEmail = (data, done)=>{
    console.log(`sending email to ${data.to}`);
    done();
}

queue.process('email', (jop, done)=>{
    sendEmail(jop.data, done);
})

kue.app.listen(3000)
console.log('kue is listening on port 3000')

queue.on('job enqueue', (id, type)=>{
    console.log(`jop ${id} enqueued with type ${type}`)
});
queue.on('job complete', (id, result)=>{
    console.log(`jop ${id} completed with result ${result}`)
});
queue.on('job failed', (id, result)=>{
    console.log(`jop ${id} failed with result ${result}`)
});
