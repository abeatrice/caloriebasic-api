const express = require('express');
const cors = require('cors');
const userRouter = require('./routers/user');
const port = process.env.PORT;
require('./db/db');

const app = express();

app.use(cors());
app.use(express.json());
app.use(userRouter);

app.listen(port, () => {
    console.log(`server running on port ${port}`);
});