const express = require('express');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

//create user
router.post('/users', async (req, res) =>{
    try {
        const user = new User(req.body);
        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).send({
            'user': {
                '_id': user._id,
                'email': user.email,
                'userName': user.userName,
                'token': token
            }
        });
    } catch(error) {
        res.status(400).send(error);
    }
});

//login user
router.post('/users/login', async (req, res) => {
    try {
        const {userName, password} = req.body;
        const user = await User.findByCredentials(userName, password);
        if(!user) {
            return res.status(401).send({error: 'Invalid Credentials'});
        }
        const token = await user.generateAuthToken();
        res.send({
            'user': {
                '_id': user._id,
                'email': user.email,
                'userName': user.userName,
                'token': token
            }
        });
    } catch (error) {
        res.status(400).send(error);
    }
});

//view logged in user profile
router.get('/users/me', auth, async(req, res) => {
    res.send(req.user);
});

//log out user
router.post('/users/me/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token != req.token;
        });
        await req.user.save();
        res.send();
    } catch (error) {
        res.status(500).send(error);
    } 
});

//log out user from all devices
router.post('/users/me/logoutall', auth, async (req, res) => {
    try {
        req.user.tokens.splice(0,req.user.tokens.length);
        await req.user.save();
        res.send();
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;