// TODO: add defaults for no "this" argument,
// Fulfill the following commands:
// -concert-this
// -spotify-this-song
// -do-what-it-says

// bands in town: "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"

const request = require("request");
const argv = process.argv;


function concertThis(st) {
  console.log(st.trim());
}

function spotifyThis(song) {
  require("dotenv").config();
  const keys = require("./keys");
  const Spotify = require('node-spotify-api');
  const spot = new Spotify(keys.spotify);
  spot.search({
    type: 'track',
    query: song
  }, function (err, data) {
    if (err) return console.log('Error occurred: ' + err);
    let x = data.tracks.items[0];
    console.log("Album: " + x.album.name);
    console.log("Artist: " + x.artists[0].name);
    console.log("Track: " + x.name);
    console.log("Preview: " + x.preview_url);
  });
}



function movieThis(mov) {
  // rewrite with template literal?
  let url = "https://www.omdbapi.com/?apikey=a2a741e9&t=" + mov.trim();
  const j = {
    json: true
  };
  request(url, j, (err, res) => {
    if (err) return console.log(err);
    if (res.body.Error) return console.log("Couldn't find that!");
    let json = res.body;
    console.log("Title: " + json.Title);
    console.log("Year: " + json.Year);
    if (json.Ratings) {
      for (let i = 0; i < json.Ratings.length; i++) {
        console.log(json.Ratings[i].Source + " Rating: " + json.Ratings[i].Value);
      }
    }
    console.log("Country: " + json.Country);
    console.log("Language(s): " + json.Language);
    console.log("----------Plot----------");
    console.log(json.Plot);
    console.log("------------------------");
    console.log("Actors: " + json.Actors + "\n");
  });
}

function doWhatItSays() {
  console.log("yo");
}



if (argv[2]) {
  switch (argv[2]) {
    case "concert-this":
      concertThis(argv[3]);
      break;
    case "ct":
      concertThis(argv[3]);
      break;
    case ("spotify-this"):
      spotifyThis(argv[3]);
      break;
    case ("st"):
      spotifyThis(argv[3]);
      break;
    case "movie-this":
      movieThis(argv[3]);
      break;
    case "mt":
      movieThis(argv[3]);
      break;
    case "do-what-it-says":
      doWhatItSays();
      break;
    case "dwis":
      doWhatItSays();
      break;
    default:
      console.log("I didn't recognize that command");
  }
}