const redis = require('redis');
const client = redis.createClient();

client.on('connect', ()=>{
  console.log('Redis client connected to the server');
});

client.on('error', (err)=>{
  console.error('Redis client not connected to the server:', err);
});

const setNewSchool = (schoolName, value)=>{
  client.set(schoolName, value, redis.print);
};

const displaySchoolName = (schoolName)=>{
  client.get(schoolName, (err, replay)=>{
    console.log(replay);
  });
};

displaySchoolName('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolName('HolbertonSanFrancisco');
