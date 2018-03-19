const express  = require('express');
const router   = express.Router();
const passport = require('passport');
const User     = require('../models/user');


// ROOT ROUTE
router.get('/', function(req, res){
    res.render('landing');
});


// SIGN UP FORM

router.get('/register', function(req, res){
    res.render('register');
});

// HANDLE SIGN UP LOGIC 

router.post('/register', function(req, res){
    const newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            req.flash('error', err.message);
            return res.render('register');
        }
        passport.authenticate('local')(req, res, function(){
            req.flash('success', 'Wellcome to WeddLoc!' + user.username);
            res.redirect('/locations');
        });
    });
});


// SHOW LOGIN FORM
router.get('/login', function(req, res){
    res.render('login');
});

// HANDLE LOGIN LOGIC ('middleware')
router.post("/login", passport.authenticate('local', 
    {  
        successRedirect: '/locations',
        failureRedirect: '/login'
        }), function(req, res){
});

// LOG OUT ROUTE

router.get('/logout', function(req, res){
    req.logout();
    req.flash('success', 'You logged out!');
    res.redirect('/locations');
});


module.exports = router;