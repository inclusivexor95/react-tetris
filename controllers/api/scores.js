const Score = require('../../models/Score');
const User = require('../../models/User');


module.exports = {
    logScore, 
    index
}

function index(req, res) {
    Score.find({})
    .then(function(scores) {
        res.status(200).json(scores);
    }).catch(function(err) {
        res.status(400).json(err);
    });
}

function logScore(req, res) {
    // console.log('req.body: ', req.body);
    console.log('username: ', req.user.name);
    if (req.user.name) {
        console.log('working');
        Score.create({...req.body, ...{userName: req.user.name}})
        .then(function(score) {
            User.findById(req.user._id)
            .then(function(user) {
                console.log('user: ', user, req.user);
                user.scores.push(score._id);
                user.save(function() {
                    res.status(200).json(score);
                });
            });
        }).catch(function(err) {
            res.status(400).json(err);
        });
    }
    else {
        Score.create({...req.body, ...{userName: 'Guest'}})
        .then(function(score) {
            res.status(200).json(score);
        }).catch(function(err) {
            res.status(400).json(err);
        });
    };
}