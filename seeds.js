const mongoose    = require('mongoose'),
      Location    = require('./models/location'),
      Comment     = require('./models/comment');

const data = [
        {name: 'Sea Dream', 
        image:'https://source.unsplash.com/WF2lvywxdMM/720x460',
        description: 'Vape fam mixtape tote bag. Cardigan wolf prism, edison bulb knausgaard skateboard small batch affogato kitsch migas slow-carb coloring book actually. ',
        author: {
            id: '588c2e054403d111454fff76',
            username: 'Anna'}
        },
        {name: 'Urbina', 
        image:'https://source.unsplash.com/40hKlFYAOeg/720x460',
        description: 'Squid yuccie try-hard drinking vinegar. Subway tile seitan brooklyn bushwick banh mi, shoreditch asymmetrical.',
        author: {
            id: '588c2e092403d122454fff76',
            username: 'Jill'
        }
        },
        {name: "The Florida Project",
        image:'https://source.unsplash.com/TkVqmu1QUSk',
        description: 'Single-origin coffee coloring book man braid freegan, vice la croix fanny pack kogi umami migas chia green juice microdosing. Food truck jianbing aesthetic wayfarers tilde XOXO',
        author: {
            id: '588c2e092403d111454fff22',
            username: 'Michael'
        }
        },
        {name: "A La Greek", 
        image:'https://source.unsplash.com/-i-g_qjFNgs/720x460',
        description: ' Art party affogato you probably have not heard of them 90s, semiotics raw denim keffiyeh pinterest heirloom wolf everyday carry synth vaporware distillery.',
        author: {
            id: '918c2e092403d111454fff76',
            username: 'Marta'
        }
        },
        {name: "Golden Lock", 
        image:'https://source.unsplash.com/8ANiHTtHbAQ/720x460',
        description: 'Wayfarers YOLO dreamcatcher gluten-free activated charcoal leggings raclette coloring book. Cardigan pinterest forage, neutra keytar VHS typewriter fashion axe hell of selfies venmo fingerstache pug.',
        author: {
            id: '588c2e052403d111454fff76',
            username: 'Jim'
        }
        },
        {name: "Au Naturelle", 
        image:'https://source.unsplash.com/O4ahjU_jCkU/720x460',
        description: 'Wayfarers YOLO dreamcatcher gluten-free activated charcoal leggings raclette coloring book. Cardigan pinterest forage, neutra keytar VHS typewriter fashion axe hell of selfies venmo fingerstache pug.',
        author: {
            id: '584c2e092403d111454fff76',
            username: 'Rachel'
        }
        },
        {name: "Hipstericum", 
        image:'https://source.unsplash.com/nPYmYjWMGsI/720x460',
        description: 'Wayfarers YOLO dreamcatcher gluten-free activated charcoal leggings raclette coloring book. Cardigan pinterest forage, neutra keytar VHS typewriter fashion axe hell of selfies venmo fingerstache pug.',
        author: {
            id: '588c2e092403d461454fff76',
            username: 'Clyde'
        }
        },
        ];

function seedDB(){
   //Remove all locations
   Location.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed locations!");
        Comment.remove({}, function(err) {
            if(err){
                console.log(err);
            }
            console.log("removed comments!");
             //add a few locations
            data.forEach(function(seed){
                Location.create(seed, function(err, location){
                    if(err){
                        console.log(err);
                    } else {
                        console.log("added a location");
                        //create a comment
                        Comment.create(
                            {
                                text: "This place is great, but I wish there was internet",
                                author: {
                                id: "588c2e092403d111454fff76",
                                username: "Jack"}
                            }, function(err, comment){
                                if(err){
                                    console.log(err);
                                } else {
                                    location.comments.push(comment);
                                    location.save();
                                    console.log("Created new comment");
                                }
                            });
                    }
                });
            });
        });
    });
    //add a few comments
}

module.exports = seedDB;