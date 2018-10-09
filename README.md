# Liri
Liri is a node app that interacts with the OMDB, spotify, and Bands In Town APIs.


There are three main commands:
* _spotify-this-song "song name"_ | _spotify-this "song name"_ | _st "song name"_
  * Queries the spotify API for a song title.
  * Returns the Album, Artist, Title, and a link to a preview of the song.
  * **Example Usage:** `node liri.js spotify-this-song "All the small things"`
* _concert-this "band name"_ | _ct "band name"_
  * Queries the BandsInTown API for upcoming concerts 
  * Returns the venue name, location, date, and time for each upcoming concert
  * **Example Usage:** `node liri.js concert-this "between the buried and me"`
* _movie-this "movie title"_ | _mt "movie title"_
  * Queries OMDb for a movie
  * Returns title, year, ratings, country, languages, plot, and actors
  * **Example Usage:** `node liri.js mt "fight club"`

There is one additional command:
  * _do-what-it-says_ | _dwis_
    * reads the random.txt file and executes the command and query found within
    * **Example Usage:** `node liri.js dwis`

An example of the app showing all functionality can be found in the examples folder.
