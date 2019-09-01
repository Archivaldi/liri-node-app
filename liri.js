
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
let command = (process.argv[2]).toLowerCase();
let item = process.argv.slice(3).join(" ");
var content = fs.readFileSync("./log.txt", "utf8")


//liri bot funciton
function liri() {

    //command spotify-this-song
    if (command === "spotify-this-song") {

        //if user put a track, liri will search this track
        if (item) {
            spotify.search({ type: 'track', query: item, limit: 1 }, function (err, data) {
                if (err) {
                    //return console.log('Error occurred: ' + err);
                }
                console.log("=======================");
                console.log("Artist: " + data.tracks.items[0].artists[0].name);
                console.log("Song name: " + data.tracks.items[0].name);
                console.log("Preview on Spotify: " + data.tracks.items[0].uri);
                console.log("Album: " + data.tracks.items[0].album.name);
                console.log("=======================");

                if (!content.includes(data.tracks.items[0].name)) {
                    fs.appendFile('./log.txt', "\n" + "\n" + command + ", " + item + "\n" + "=======================" + "\n" + "Artist: " +
                        data.tracks.items[0].artists[0].name + "\n" + "Song name: " + data.tracks.items[0].name +
                        "\n" + "Preview on Spotify: " + data.tracks.items[0].uri + "\n" + "Album: " + data.tracks.items[0].album.name +
                        "\n" + "=======================", "utf8", function (err) { })
                }
            });

        } else {

            //if user didn't put a track, liri will give default information
            spotify.search({ type: 'track', query: "The Sign", limit: 10 }, function (err, data) {
                if (err) {
                    return console.log('Error occurred: ' + err);
                }
                console.log("=======================");
                console.log("Artist: " + data.tracks.items[3].artists[0].name);
                console.log("Song name: " + data.tracks.items[3].name);
                console.log("Preview on Spotify: " + data.tracks.items[0].uri);
                console.log("Album: " + data.tracks.items[3].album.name);
                console.log("=======================");

                if (!content.includes(data.tracks.items[3].name)) {
                    fs.appendFile('./log.txt', "\n" + "\n" + command + "\n" + "=======================" + "\n" + "Artist: " +
                        data.tracks.items[3].artists[0].name + "\n" + "Song name: " + data.tracks.items[3].name +
                        "\n" + "Preview on Spotify: " + data.tracks.items[3].uri + "\n" + "Album: " + data.tracks.items[3].album.name +
                        "\n" + "=======================", "utf8", function (err) { })
                }
            });

        }

    } else if (command === "concert-this") {

        if (item) {

            //command concert-this will give information about venues of artist that we entered
            axios.get("https://rest.bandsintown.com/artists/" + item + "/events?app_id=codingbootcamp").then((response) => {
                if (response.data.length == 0) {
                    console.log("Sorry, this artist doesn't have upcoming events");
                } else {

                    if (!content.includes(command && item)) {
                        fs.appendFile('./log.txt', "\n" + "\n" + command + ", " + item, "utf8", function (err) { });
                    }

                    for (var i = 0; i < response.data.length; i++) {
                        console.log("=======================");
                        console.log("Venue: " + response.data[i].venue.name);
                        console.log("Location: " + response.data[i].venue.city + ", " + response.data[i].venue.region);
                        console.log("Date: " + moment(response.data[i].datetime).format("MM/DD/YYYY"));
                        console.log("=======================");

                        if (!content.includes(response.data[i].venue.name)) {
                            fs.appendFile('./log.txt', "\n" + "=======================" + "\n" + "Venue: " + response.data[i].venue.name +
                                "\n" + "Location: " + response.data[i].venue.city + ", " + response.data[i].venue.region +
                                "\n" + "Date: " + moment(response.data[i].datetime).format("MM/DD/YYYY") +
                                "\n" + "=======================", "utf8", function (err) { })
                        }
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

    } else if (command === "movie-this") {

        //command movie-this will give information about movie that user needs
        if (item) {
            axios.get("https://www.omdbapi.com/?t=" + item + "&plot=short&apikey=trilogy").then((response) => {
                console.log("=======================");
                console.log("Title: " + response.data.Title);
                console.log("Year: " + response.data.Year);
                console.log("IMDB Rating: " + response.data.imdbRating);

                if (response.data.Ratings.length >= 2) {
                    console.log("Rotten Tomatoes: " + response.data.Ratings[1].Value);
                }

                console.log("Country: " + response.data.Country);
                console.log("Language: " + response.data.Language);
                console.log("Plot: " + response.data.Plot);
                console.log("Actors: " + response.data.Actors);
                console.log("=======================");

                if (!content.includes(response.data.Title)) {
                    if (response.data.Ratings.length >= 2) {
                        fs.appendFile('./log.txt', "\n" + "\n" + command + "\n" + "=======================" + "\n" + "Title: " + response.data.Title +
                            "\n" + "Year: " + response.data.Year + "\n" + "IMDB Rating: " + response.data.imdbRating + "\n" + "Rotten Tomatoes: " + response.data.Ratings[1].Value +
                            "\n" + "Country: " + response.data.Country + "\n" + "Language: " + response.data.Language +
                            "\n" + "Plot: " + response.data.Plot + "\n" + "Actors: " + response.data.Actors +
                            "\n" + "=======================", "utf8", function (err) { })
                    } else {
                        fs.appendFile('./log.txt', "\n" + "\n" + command + "\n" + "=======================" + "\n" + "Title: " + response.data.Title +
                            "\n" + "Year: " + response.data.Year + "\n" + "IMDB Rating: " + response.data.imdbRating +
                            "\n" + "Country: " + response.data.Country + "\n" + "Language: " + response.data.Language +
                            "\n" + "Plot: " + response.data.Plot + "\n" + "Actors: " + response.data.Actors +
                            "\n" + "=======================", "utf8", function (err) { })
                    }
                }
            })


        } else {

            //if user didn't put any movie, by default liri will give information about "Mr.Nobody" movie
            axios.get("https://www.omdbapi.com/?t=Mr.Nobody&y=&plot=short&apikey=trilogy").then((response) => {
                console.log("=======================");
                console.log("Title: " + response.data.Title);
                console.log("Year: " + response.data.Year);
                console.log("IMDB Rating: " + response.data.imdbRating);
                if (response.data.Ratings[1].Value) {
                    console.log("Rotten Tomatoes: " + response.data.Ratings[1].Value);
                }
                console.log("Country: " + response.data.Country);
                console.log("Language: " + response.data.Language);
                console.log("Plot: " + response.data.Plot);
                console.log("Actors: " + response.data.Actors);
                console.log("=======================");

                if (!content.includes(response.data.Title)) {
                    if (response.data.Ratings.length >= 2) {
                        fs.appendFile('./log.txt', "\n" + "\n" + command + "\n" + "=======================" + "\n" + "Title: " + response.data.Title +
                            "\n" + "Year: " + response.data.Year + "\n" + "IMDB Rating: " + response.data.imdbRating + "\n" + "Rotten Tomatoes: " + response.data.Ratings[1].Value +
                            "\n" + "Country: " + response.data.Country + "\n" + "Language: " + response.data.Language +
                            "\n" + "Plot: " + response.data.Plot + "\n" + "Actors: " + response.data.Actors +
                            "\n" + "=======================", "utf8", function (err) { })
                    } else {
                        fs.appendFile('./log.txt', "\n" + "\n" + command + "\n" + "=======================" + "\n" + "Title: " + response.data.Title +
                            "\n" + "Year: " + response.data.Year + "\n" + "IMDB Rating: " + response.data.imdbRating +
                            "\n" + "Country: " + response.data.Country + "\n" + "Language: " + response.data.Language +
                            "\n" + "Plot: " + response.data.Plot + "\n" + "Actors: " + response.data.Actors +
                            "\n" + "=======================", "utf8", function (err) { })
                    }
                }
            })


        }

        //command do-what-it-says will give user default command and item
    } else if (command === "do-what-it-says") {

        //function for choosing randon live from random.txt file

        var contents = fs.readFileSync('./random.txt', 'utf8');
        var arrayCommas = [];
        var arrayOpens = [];
        var arrayClosing = [];

        for (var i = 0; i < contents.length; i++) {
            if (contents[i] === ",")  {
                arrayCommas.push(i);
            } else if (contents[i] === "(") {
                arrayOpens.push(i);
            } else if (contents[i] === ")") {
                arrayClosing.push(i);
            }
        }

        var number = Math.floor(Math.random() * arrayCommas.length);

        command = contents.slice(arrayOpens[number] + 1, arrayCommas[number]).toLowerCase();
        item = contents.slice(arrayCommas[number] + 2, arrayClosing[number]).toLowerCase();

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
