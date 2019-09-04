const mongoose = require('mongoose');

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
calorieSchema.statics.findByUserId = async (id, date) => {
    if (date) {
        const start = new Date(date);
        const end = new Date(start.setDate(start.getDate() + 1));
        return await Calorie.find({user_id: id, date: {"$gte": date, "$lt": end}});
    }
    return await Calorie.find({user_id: id});
};

const Calorie = mongoose.model('Calorie', calorieSchema);

module.exports = Calorie;