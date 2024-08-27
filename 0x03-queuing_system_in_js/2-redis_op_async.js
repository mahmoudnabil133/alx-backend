const redis = require('redis');
const client = redis.createClient();
const { promisify } = require('util');
client.on('connect', ()=>{
  console.log('Redis client connected to the server');
});

client.on('error', (err)=>{
  console.error('Redis client not connected to the server:', err);
});

const setNewSchool = (schoolName, value)=>{
  client.set(schoolName, value, redis.print);
};

const getAsync = promisify(client.get).bind(client);

const displaySchoolName = async (schoolName)=>{
  const value = await getAsync(schoolName);
  console.log(value);
};

displaySchoolName('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolName('HolbertonSanFrancisco');
