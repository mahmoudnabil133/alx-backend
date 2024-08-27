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

const getSchoolName = async (schoolName)=>{
  const val  = await getAsync(schoolName);
  if (!val) throw new Error('School not found');
  return val;
};
// const getSchoolName = (schoolName)=>{
//   return new Promise(async (resolve, reject)=>{
//     try{
//       const value = await getAsync(schoolName);
//       if (!value) throw new Error('School not found');
//       resolve(value);
//     } catch (error){
//       reject(error);
//     }
//   })
// };

getSchoolName('Holberto')
  .then(val=>console.log(val))
  .catch(error=>console.log(error.message));
// setNewSchool('HolbertonSanFrancisco', '100');
// displaySchoolName('HolbertonSanFrancisco');
