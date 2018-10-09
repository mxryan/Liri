// Fulfill the following commands:
// -do-what-it-says
// add !error && response.statuseCode error handling (see omdb class activity and request npm page)
// add chalk to make it all look cool?

const request = require("request");
let doWhatFlag = false;

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


function parseDate(date) {
  //converts YYYY-MM-DD to MM/DD/YYYY
  const pieces = date.split("-");
  return pieces[1] + "/" + pieces[2] + "/" + pieces[0];
}

function concertThis(artist) {
  console.log(" ");
  if (!artist) return console.log("You need to give me an artist with this command!");
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
    console.log(" ");
  })
}

function spotifyThis(song) {
  console.log(" ");
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
    console.log(" ");
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
    console.log(" ");
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
    console.log(" ");
  });
}

function doWhatItSays() {
  doWhatFlag = true;
  const fs = require('fs');
  fs.readFile("./random.txt", "utf8",(err, data)=>{
    if (err) return console.log(err);
    const pieces = data.split(",");
    console.log(pieces[0], pieces[1]);
    executeSwitchStatement(pieces[0], pieces[1]);
  })
}

function executeSwitchStatement(command, target) {
  if (command) {
    switch (command) {
      case "concert-this":
        concertThis(target);
        break;
      case "ct":
        concertThis(target);
        break;
      case "spotify-this-song":
        spotifyThis(target);
        break;
      case ("spotify-this"):
        spotifyThis(target);
        break;
      case ("st"):
        spotifyThis(target);
        break;
      case "movie-this":
        movieThis(target);
        break;
      case "mt":
        movieThis(target);
        break;
      case "do-what-it-says":
        if(!doWhatFlag) doWhatItSays();
        break;
      case "dwis":
        if(!doWhatFlag) doWhatItSays();
        break;
      default:
        if (doWhatFlag){
          console.log("I didn't understand the instructions in random.txt");
        } else { 
          console.log("I didn't recognize that command")
        };
    }
  }
}

if (process.argv[2]) executeSwitchStatement(process.argv[2], process.argv[3]);
