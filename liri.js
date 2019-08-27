require("dotenv").config();
const keys = require("./keys.js");

const Spotify = require('node-spotify-api');
const spotify = new Spotify(keys.spotify);

const fs = require("fs");

const axios = require("axios");
const moment = require("moment");



let command = process.argv[2];
let item = process.argv[3];

if (command === "spotify-this-song") {
    spotify.search({ type: 'track', query: item, limit: 1 }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        console.log("Artist: " + data.tracks.items[0].artists[0].name);
        console.log("Song name: " + data.tracks.items[0].name);
        console.log("Preview on Spotify: " + data.tracks.items[0].uri);
        console.log("Album: " + data.tracks.items[0].album.name);
    });

} else if (command === "concert-this") {

    axios.get("https://rest.bandsintown.com/artists/" + item + "/events?app_id=codingbootcamp").then((response) => {
        if (response.data.length == 0) {
            console.log("Sorry, this artist doesn't have upcoming events");
        } else {
            for (var i = 0; i < response.data.length; i++){
                console.log("=======================");
                console.log("Venue: " + response.data[i].venue.name);
                console.log("Location: " + response.data[i].venue.city + ", " + response.data[i].venue.region);
                console.log("Date: " + moment(response.data[i].datetime).format("MM/DD/YYYY"));
                console.log("=======================");
            }
        }
    }).catch((err) => {
        if (err) {
            console.log(err.message);
        }
    })

} else if (command === "movie-this") {
    if (item) {
        axios.get("https://www.omdbapi.com/?t=" + item + "&y=&plot=short&apikey=trilogy").then((response) => {
            console.log("Title: " + response.data.Title);
            console.log("Year: " + response.data.Year);
            console.log("IMDB Rating: " + response.data.imdbRating);
            console.log("Rotten Tomatoes: " + response.data.Ratings[1].Value);
            console.log("Country: " + response.data.Country);
            console.log("Language: " + response.data.Language);
            console.log("Plot: " + response.data.Plot);
            console.log("Actors: " + response.data.Actors);
        })
    } else {
        axios.get("https://www.omdbapi.com/?t=Mr.Nobody&y=&plot=short&apikey=trilogy").then((response) => {
            console.log("Title: " + response.data.Title);
            console.log("Year: " + response.data.Year);
            console.log("IMDB Rating: " + response.data.imdbRating);
            console.log("Rotten Tomatoes: " + response.data.Ratings[1].Value);
            console.log("Country: " + response.data.Country);
            console.log("Language: " + response.data.Language);
            console.log("Plot: " + response.data.Plot);
            console.log("Actors: " + response.data.Actors);
        })
    }
} else if (command === "do-what-it-says") {

    var contents = fs.readFileSync('./random.txt', 'utf8');
    console.log(contents);

} else {
    console.log("Sorry, the command is not recognized. Please try following commands: 'concert-this', 'spotify-this-song', 'movie-this', 'do-what-it-says'")
}
