# liri-node-app

LIRI is a _Language_ Interpretation and Recognition Interface, it's a command line node app that takes in parameters and gives you back data.

LIRI takes 4 following commands: 

`movie-this`
`spotify-this-song`
`concert-this`
`do-what-it-says`

Please note that command should be written with dash, but it's not sensitive for upper and lower cases. The title of movie could be wrtitten with/without dashes.

1. "movie-this" MOVIE GOES HERE will give a data about movie that includes: Title, Year, imbRating, Rotten Tomatoes rating (!Please note that 
not all movies have this rating), country, language, plot and actors. User will see this data in node console, but also it will be saves in log.txt file. If this data already in log.txt file, it will not be rewritten again. If user will put command only without any movie, by default LIRI will give data about "Mr. Nobody" movie. 

2. "spotify-this-song" SONG GOES HEREwill give a data about song that includes: artist's name, song name, link for preview on Spotify and album.
As well as with first command, user will see this data in node console, but also it will be saves in log.txt file. If this data already in log.txt file, it will not be rewritten again. If user will put command only without any song, by default LIRI will give data about "The Sign" by Ace of Base.

3. "concert-this" ARTIST-GOES-HERE will give a data about upcoming events of artist. Please note, that some artists don't have upcoming events. In that case LIRI will give a message "Sorry, this artist doesn't have upcoming events". The data will include: venue name, venue location and date of the venue. User will see this data in node console, but also it will be saves in log.txt file. If this data already in log.txt file, it will not be rewritten again. If user didn't write any artisr, LIRI will give a message: "Please write name of artist".

4. "do-what-it-says" will take a data from random.txt file. In my case, it will be "spotify-this-song "I Want it That Way"", but user can always change it. 