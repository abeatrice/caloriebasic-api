require('dotenv').config();

const express = require('express');
const cors = require('cors');
const userRouter = require('./routers/user');
const calorieRouter = require('./routers/calorie');
const port = process.env.PORT || 3001;
require('./db/db');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', userRouter);
app.use('/api', calorieRouter);

app.listen(port, () => console.log(`server running on port ${port}`));