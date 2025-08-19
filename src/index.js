const express = require("express");
const app = express();
const dotenv = require("dotenv");
const connectDB = require('../src/config/db.js')
const cookieparser = require('cookie-parser');
const authRouter =  require('./routes/userAuth.js')
const redisClient = require("./config/redis.js");
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieparser());


app.use('/api/v1/user', authRouter);



connectDB();
redisClient.connect().then(() => {
    console.log("✅ Redis Client Connected");
}).catch((err) => {
    console.error("❌ Redis Client Connection Error", err);
});


app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
