// Fulfill the following commands:
// -do-what-it-says

const request = require("request");
const argv = process.argv;

function parseTime(time) {
  // converts military time to hh:mm am/pm
  const pieces = time.split(":");
  let h = parseInt(pieces[0]);
  let m = parseInt(pieces[1]);
  let amPm = h > 11 ? " PM" : " AM";
  if (h > 11) h -= 12;
  if (h === 0) h = 12;
  m = m < 10 ? (m < 1 ? '00' : '0' + m) : m;
  return h + ":" + m + amPm
}

console.log(parseTime("00:37"));
console.log(parseTime("12:37"));

function parseDate(date) {
  //converts YYYY-MM-DD to MM/DD/YYYY
  const pieces = date.split("-");
  return pieces[1] + "/" + pieces[2] + "/" + pieces[0];
}

function concertThis(artist) {
  if (!artist) return console.log("You need to give me an artist with this command!");
  console.log(artist);
  // Name of the venue
  // Venue location
  // Date of the Event (use moment to format this as "MM/DD/YYYY")
  let url = "https://rest.bandsintown.com/artists/" + artist.trim() + "/events?app_id=codingbootcamp";

  const j = {json: true};
  request(url, j, (err, res) => {
    if (err) return console.log(err);
    
    for (var i = 0; i < res.body.length; i++){
      console.log("--------------------------------")
      console.log(res.body[i].venue.name)
      console.log(
        res.body[i].venue.city
        + (res.body[i].venue.region ? ", " +res.body[i].venue.region: "") 
        + ", " + res.body[i].venue.country
      );
      let dt = res.body[i].datetime.split("T");
      console.log(parseDate(dt[0]));
      console.log(parseTime(dt[1]));
    }
  })
}

function spotifyThis(song) {
  if (!song) return console.log("You have to give me a song with this command!");
  require("dotenv").config();
  const keys = require("./keys");
  const Spotify = require('node-spotify-api');
  const spot = new Spotify(keys.spotify);
  spot.search({
    type: 'track',
    query: song.trim()
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
  if (!mov) return console.log("You need to give me a movie with this command!");
  let url = "https://www.omdbapi.com/?apikey=a2a741e9&t=" + mov.trim();
  const j = {json: true};
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