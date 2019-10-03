require('dotenv').config();

const express = require('express');
const cors = require('cors');
const userRouter = require('./routers/user');
const calorieRouter = require('./routers/calorie');
const port = process.env.PORT;
require('./db/db');

const app = express();

app.use(cors());
app.use(express.json());
app.use(userRouter);
app.use(calorieRouter);

app.listen(port, () => {
    console.log(`server running on port ${port}`);
});