const express = require('express');
const Calorie = require('../models/Calorie');
const auth = require('../middleware/auth');

const router = express.Router();

//create calories
router.post('/calories', auth, async (req, res) => {
    try {
        const calorie = new Calorie(req.body);
        calorie.user_id = req.user._id;
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
    const date = req.params.date || null;
    try {
        const calories = await Calorie.findByUserId(req.user._id, date);
        res.send({
            calories
        });
    } catch (error) {
        res.status(400).send(error);        
    }
});

module.exports = router;