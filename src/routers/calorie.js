const express = require('express');
const moment = require('moment');
const Calorie = require('../models/Calorie');
const auth = require('../middleware/auth');

const router = express.Router();

//create calories
router.post('/calories', auth, async (req, res) => {
    try {
        const date = req.body.date || moment().format('YYYY-MM-DD');
        const user_id = req.user._id;
        let calorie = await Calorie.caloriesOnDate(user_id, date);
        if(calorie) {
            calorie.quantity += req.body.quantity;
        } else {
            calorie = new Calorie(req.body);
            calorie.user_id = user_id;
            calorie.date = date;
        }
        if(calorie.quantity < 0) {
            calorie.quantity = 0;
        }
        calorie.save();
        res.status(201).send({
            calorie
        });
    } catch(error) {
        res.status(400).send(error);
    }
});

//get user calories
router.get('/me/calories/:date?', auth, async (req, res) => {
    const date = moment(req.params.date) || moment();
    try {
        const calories = await Calorie.caloriesOnDate(req.user._id, date.format('YYYY-MM-DD'));
        res.send({
            calories
        });
    } catch (error) {
        res.status(400).send(error);        
    }
});

module.exports = router;