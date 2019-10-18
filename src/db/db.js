const mongoose = require('mongoose');
const mongo_url = process.env.MONGODB_URL || 'mongodb://localhost/caloriebasic'; 

mongoose.connect(mongo_url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true
});