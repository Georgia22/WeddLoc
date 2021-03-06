const express       = require('express'),
      app           = express(),
      bodyParser    = require('body-parser'),
      mongoose      = require('mongoose'),
      flash         = require('connect-flash'),
      passport      = require('passport'),
      LocalStrategy = require('passport-local'),
      methodOverride = require('method-override'),
      User          = require('./models/user'),
      seedDB        = require('./seeds');
      require('dotenv').config();
      


const commentRoutes  = require('./routes/comments'),
      locationRoutes = require('./routes/locations'),
      indexRoutes    = require('./routes/index');



mongoose.connect('mongodb://localhost/wedd_loc');
//mongoose.connect('mongodb://alina:alina22@ds115729.mlab.com:15729/wedd-loc');
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(methodOverride("_method"));
app.use(flash());  
//seedDB();

// passport configuration
app.use(require('express-session')({
    secret: 'blabla',
    resave: false,
    saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
   next();
});

app.use(indexRoutes);
app.use('/locations', locationRoutes);
app.use('/locations/:id/comments', commentRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
    console.log('The WeddLoc Server Has Started!');
});