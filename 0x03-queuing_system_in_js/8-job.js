const createPushNotificationsjobs = (jobs, queue)=>{
    if(!(jobs instanceof Array)) throw new Error(`Jobs is not an array`);
    jobs.forEach((jobObject)=>{
        const job = queue.create('push_notification_code_3', jobObject)
        .save((err)=>{
            if(!err){
                console.log(`Notification job created: ${job.id}`)
            }
        });
        job.on('complete', ()=>{
            console.log(`Notification job ${job.id} completed`);
        });
        job.on('failed', (err)=>{
            console.log(`Notification job ${job.id} failed: ${err}`)
        });
        job.on('progress', (progress)=>{
            console.log(`Notification job ${job.id} ${progress}% complete`)
        })
    })
}

module.exports = createPushNotificationsjobs;
