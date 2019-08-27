require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);    

const axios = require("axios");
const moment = require ("moment");

//axios.get("")


var command = process.argv[2];
console.log(command);

var item = process.argv[3];
console.log(item);

if (command === "spotify-this-song"){
    spotify.search({ type: 'track', query: item, limit: 1 }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
       
      console.log("Artist: " + data.tracks.items[0].artists[0].name); 
      console.log("Song name: "+ data.tracks.items[0].name); 
      console.log("Preview on Spotify: " + data.tracks.items[0].uri); 
      console.log("Album: " + data.tracks.items[0].album.name); 
      });
} else if (command === "concert-this"){

} else if (command === "movie-this"){

} else if (command === "do-what-it-says"){

} else {
    console.log("Sorry, the command is not recognized. Please try following commands: 'concert-this', 'spotify-this-song', 'movie-this', 'do-what-it-says'")
}
