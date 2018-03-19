const express = require("express");
const router  = express.Router();
const Location = require("../models/location");
const middleware = require("../middleware");

/* multer - cloudinary requests & configurations */

const multer = require('multer');
const storage = multer.diskStorage({
  filename: function(req, file, callback) {
    callback(null, Date.now() + file.originalname);
  }
});
const imageFilter = function (req, file, cb) {
    // accept image files only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};
const upload = multer({ storage: storage, fileFilter: imageFilter});

var cloudinary = require('cloudinary');
cloudinary.config({ 
  cloud_name: 'dveiqeio6', 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});


//INDEX - show all campgrounds
router.get("/", function(req, res){
    // Get all campgrounds from DB
    Location.find({}, function(err, allLocations){
       if(err){
           console.log(err);
       } else {
          res.render("locations/index", {locations:allLocations});
       }
    });
});

//CREATE - add new location to DB
router.post("/", middleware.isLoggedIn, upload.single('image'), function(req, res) {
    cloudinary.uploader.upload(req.file.path, function(result) {
    // add cloudinary url for the image to the campground object under image property
    req.body.location.image = result.secure_url;
    // add author to campground
    req.body.location.author = {
        id: req.user._id,
        username: req.user.username
      };
    Location.create(req.body.location, function(err, location) {
        if (err) {
          req.flash('error', err.message);
          return res.redirect('back');
        }
        res.redirect('/locations/' + location.id);
      });
    });
});

//NEW - show form to create new location
router.get("/new", middleware.isLoggedIn, function(req, res){
   res.render("locations/new"); 
});

// SHOW - shows more info about one location
router.get("/:id", function(req, res){
    //find the location with provided ID
    Location.findById(req.params.id).populate("comments").exec(function(err, foundLocation){
        if(err){
            console.log(err);
        } else {
            console.log(foundLocation);
            //render show template with that location
            res.render("locations/show.ejs", {location: foundLocation});
        }
    });
});

// EDIT LOCATION ROUTE
router.get("/:id/edit", middleware.checkLocationOwnership, function(req, res){
    Location.findById(req.params.id, function(err, foundLocation){
        res.render("locations/edit", {location: foundLocation});
    });
});

// UPDATE LOCATION ROUTE
router.put("/:id", middleware.checkLocationOwnership, function(req, res){
    // find and update the correct campground
    Location.findByIdAndUpdate(req.params.id, req.body.location, function(err, updatedLocation){
       if(err){
           res.redirect("/locations");
       } else {
           //redirect somewhere(show page)
           res.redirect("/locations/" + req.params.id);
       }
    });
});

// DESTROY LOCATION ROUTE
router.delete("/:id", middleware.checkLocationOwnership, function(req, res){
   Location.findByIdAndRemove(req.params.id, function(err){
      if(err){
          res.redirect("/locations");
      } else {
          res.redirect("/locations");
      }
   });
});


module.exports = router;

