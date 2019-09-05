const mongoose = require('mongoose');
const moment = require('moment');

const calorieSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

//get calories by user id, optional date
calorieSchema.statics.findByUserId = async (id, date, days) => {
    if (date) {
        const end = moment(date);
        const start = moment(end).subtract(days ? days : 1, 'days');
        return await Calorie.find({user_id: id, date: {"$gte": start, "$lt": end}}).sort( { date: -1 } );
    }
    return await Calorie.find({user_id: id});
};

const Calorie = mongoose.model('Calorie', calorieSchema);

module.exports = Calorie;