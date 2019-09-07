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

//get calories by user id for the week prior to given date
calorieSchema.statics.findByUserId = async (id, end) => {
    end = moment(end).format('YYYY-MM-DD');
    start = moment(end).subtract(7, 'days').format('YYYY-MM-DD');
    console.log(start, end)
    return await Calorie.aggregate([{ 
            $match : { 
                user_id: id,
                date: {
                    "$gt" : new Date(start), 
                    "$lte" : new Date(end)
                }
            }
        }, { 
            $group: {
                _id: {
                    "date": {$dateToString: {format: "%Y-%m-%d", date: "$date"}}
                },
                quantity: {
                    $sum: "$quantity"
                }
            }
        }, {
            $sort: {
                _id: -1
            }
        }]);
};

const Calorie = mongoose.model('Calorie', calorieSchema);

module.exports = Calorie;