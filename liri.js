
//add dotenv package for hiding private api keys
require("dotenv").config();
const keys = require("./keys.js");

//spotify npm package
const Spotify = require('node-spotify-api');
const spotify = new Spotify(keys.spotify);

//files system npm pakage
const fs = require("fs");

//package for making requests
const axios = require("axios");

//format date npm pakage
const moment = require("moment");


//declare command and item that will be used
let command = process.argv[2];
let item = process.argv[3];


//liri bot funciton
function liri() {

    //command spotify-this-song
    if (command === "spotify-this-song") {

        //if user put a track, liri will search this track
        if (item) {
            spotify.search({ type: 'track', query: item, limit: 1 }, function (err, data) {
                if (err) {
                    return console.log('Error occurred: ' + err);
                }
                console.log("=======================");
                console.log("Artist: " + data.tracks.items[0].artists[0].name);
                console.log("Song name: " + data.tracks.items[0].name);
                console.log("Preview on Spotify: " + data.tracks.items[0].uri);
                console.log("Album: " + data.tracks.items[0].album.name);
                console.log("=======================");
            });

            //if user didn't put a track, liri will give default information
        } else {
            spotify.search({ type: 'track', query: "The Sign", limit: 3}, function (err, data) {
                if (err) {
                    return console.log('Error occurred: ' + err);
                }
                    console.log("=======================");
                    console.log("Artist: " + data.tracks.items[2].artists[0].name);
                    console.log("Song name: " + data.tracks.items[2].name);
                    console.log("Preview on Spotify: " + data.tracks.items[0].uri);
                    console.log("Album: " + data.tracks.items[2].album.name);
                    console.log("=======================");
            });
        }

        //command concert-this will give information about venues of artist that we entered
    } else if (command === "concert-this") {

        if (item) {
            axios.get("https://rest.bandsintown.com/artists/" + item + "/events?app_id=codingbootcamp").then((response) => {
                if (response.data.length == 0) {
                    console.log("Sorry, this artist doesn't have upcoming events");
                } else {
                    for (var i = 0; i < response.data.length; i++) {
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
        } else {
            console.log("Please write name of artist");
        }


            //command movie-this will give information about movie that user needs
    } else if (command === "movie-this") {
        if (item) {
            axios.get("https://www.omdbapi.com/?t=" + item + "&y=&plot=short&apikey=trilogy").then((response) => {
                console.log("=======================");
                console.log("Title: " + response.data.Title);
                console.log("Year: " + response.data.Year);
                console.log("IMDB Rating: " + response.data.imdbRating);
                console.log("Rotten Tomatoes: " + response.data.Ratings[1].Value);
                console.log("Country: " + response.data.Country);
                console.log("Language: " + response.data.Language);
                console.log("Plot: " + response.data.Plot);
                console.log("Actors: " + response.data.Actors);
                console.log("=======================");
            })

            //if user didn't put any movie, by default liri will give information about "Mr.Nobody" movie
        } else {
            axios.get("https://www.omdbapi.com/?t=Mr.Nobody&y=&plot=short&apikey=trilogy").then((response) => {
                console.log("=======================");
                console.log("Title: " + response.data.Title);
                console.log("Year: " + response.data.Year);
                console.log("IMDB Rating: " + response.data.imdbRating);
                console.log("Rotten Tomatoes: " + response.data.Ratings[1].Value);
                console.log("Country: " + response.data.Country);
                console.log("Language: " + response.data.Language);
                console.log("Plot: " + response.data.Plot);
                console.log("Actors: " + response.data.Actors);
                console.log("=======================");
            })
        }

        //command do-what-it-says will give user default command and item
    } else if (command === "do-what-it-says") {

        var contents = fs.readFileSync('./random.txt', 'utf8');
        command = contents.slice(0, contents.indexOf(","));
        item = contents.slice(contents.indexOf(",") + 2);
        liri();

            //if user put command that wasn't recognized by liri, user will get this message
    } else {
        console.log("=======================");
        console.log("Sorry, the command is not recognized. Please try following commands: 'concert-this', 'spotify-this-song', 'movie-this', 'do-what-it-says'")
        console.log("=======================");
    }
}

//executing the liri bot function
liri();
