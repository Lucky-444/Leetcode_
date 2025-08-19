
const dotenv = require('dotenv');
dotenv.config();

const { createClient } =  require('redis');
console.log("Connecting to Redis...");
console.log(process.env.REDIS_KEY)
const redisClient = createClient({
    username: 'default',
    password: process.env.REDIS_KEY,
    socket: {
        host: 'redis-19697.c245.us-east-1-3.ec2.redns.redis-cloud.com',
        port: 19697
    }
});

redisClient.on("error", (err) => console.error("❌ Redis Client Error", err));

module.exports = redisClient;
