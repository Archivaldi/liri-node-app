LIRI is a Language Interpretation and Recognition Interface. It's a command line node app that takes in parameters and gives you back data.
LIRI takes the 4 following commands:

`movie-this`
`spotify-this-song` 
`concert-this` 
`do-what-it-says`

Please note that command is not cases sensitive, but should be written with a dash. The title of movie/song/artist could be written with/without dashes.
1. "movie-this" MOVIE GOES HERE will give a data about movie that includes: Title, Year, imbRating, Rotten Tomatoes rating (!Please note that not all movies have this rating), country, language, plot and actors. User will see this data in node console, but also it will be saved in log.txt file. If this data already exists in the log.txt file, it will not be rewritten. If the user types the command without any movie title, by default LIRI will give data about "Mr. Nobody".

2. "spotify-this-song" SONG GOES HERE will give data about song that includes: artist's name, song name, link for preview on Spotify and album. As well as with first command, user will see this data in node console, but also it will be saved in log.txt file. If this data already exists in log.txt file, it will not be rewritten. If user types the command only without any song, by default LIRI will give data about "The Sign" by Ace of Base.

3. "concert-this" ARTIST-GOES-HERE will give a data about upcoming events of the artist. Please note that if the artist doesn't have an upcoming event, LIRI will display: "Sorry, this artist doesn't have upcoming events". The data will include: venue name, venue location and date of the venue. User will see this data in node console, but also it will also be saved in a log.txt file. If this data already exists in the log.txt file, it will not be rewritten. If the user types the command without the artist name, LIRI will give a message: "Please write name of artist".

4. "do-what-it-says" will read a data from random.txt file and randomly take one line. In my case, it will be 
"(spotify-this-song, I Want it That Way) 
(movie-this, Titanic)
(concert-this, Skrillex)"
But the user can always add/delete new lines. But the format should be exactly the same. Example: "(spotify-this-song, I Want it That Way)". 
Not case sensitive.