const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require('cors')
const connectDB = require('../src/config/db.js')
const cookieparser = require('cookie-parser');
const authRouter =  require('./routes/userAuth.js')
const problemRouter = require('./routes/problemRoutes.js');
const problemSubmissionRouter = require('./routes/problemSubmission.js')
const redisClient = require("./config/redis.js");
dotenv.config();

app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieparser());




connectDB();
redisClient.connect().then(() => {
    console.log("✅ Redis Client Connected");
}).catch((err) => {
    console.error("❌ Redis Client Connection Error", err);
});


app.use('/api/v1/users', authRouter);
app.use('/api/v1/problem', problemRouter);
app.use('/api/v1/problem/submit', problemSubmissionRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
