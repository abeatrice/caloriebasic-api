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

//get calories by user id
calorieSchema.statics.findByUserId = async (id) => {
    const calories = await Calorie.find({id});
    if(!calories) {
        return null;
    }
    return calories;
};

const Calorie = mongoose.model('Calorie', calorieSchema);

module.exports = Calorie;