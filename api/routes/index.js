var express = require('express');
var router = express.Router();
var request = require("request");
const fetch = require("node-fetch");
var btoa = require("btoa");
const { RequestHeaderFieldsTooLarge } = require('http-errors');



const clientID = "040d08f49da545b9b0e32795e0dd8372";
const clientSecret = "dc95f53d92534300adcec5a4fefe089f";

async function quickstart() {
  // Imports the Google Cloud client library
  const language = require('@google-cloud/language');

  // Instantiates a client
  const client = new language.LanguageServiceClient();

  // The text to analyze
  const text = global.keyword;

  const document = {
    content: text,
    type: 'PLAIN_TEXT',
  };

  // Detects the sentiment of the text
  const [result] = await client.analyzeSentiment({document: document});
  const sentiment = result.documentSentiment;
  global.magnitude = sentiment.magnitude.toFixed(1);

  console.log(`Text: ${text}`);
  console.log(`Sentiment score: ${sentiment.score}`);
  console.log(`Sentiment magnitude: ${global.magnitude}`);

  const valence = (sentiment.score + 1) / 2
  global.finalValence = valence.toFixed(2);

  console.log(`Valence score: ${global.finalValence}`);
}


function getRandomNumber() {  
  return Math.floor(
    Math.random() * (100 - 1 + 1) + 1

  )
}


getToken = async () => {

  const result = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type' : 'application/x-www-form-urlencoded',
      'Authorization' : 'Basic ' + btoa(clientID + ':' + clientSecret)
    },
    body: 'grant_type=client_credentials'
  });

  const data = await result.json();
  return data.access_token;

};

getListOfGenreSongs = async (token, valence, magnitude) => {
  spotifytoken = await token;
  const result = await fetch(`https://api.spotify.com/v1/recommendations?limit=100&market=GB&seed_genres=jazz&min_popularity=50&target_valence=${valence}`, {
    method: 'GET',
    headers: { 'Authorization' : 'Bearer ' + spotifytoken }
  });
  
  const data = await result.json();

  // console.log(data);
  // console.log(data.tracks[1]);
  return data
  // return data.playlists.items[0].id;

};

getSongIDFromList = async (listOfSongs, token, number) => {
  spotifyList = await listOfSongs;
  spotifytoken = await token;
  randomNumber = await number;
  songID = await spotifyList.tracks[randomNumber][id]

  console.log(songID);
  return songID;
}

getSongAttributes = async (songIDs, token) => {
  songIDs = await songIDs;
  token = await token;
  requestIDs = ''
  songIDs.forEach((id) => {
    requestIDs += id + '%2C'
  })
  requestIDs = requestIDs.substring(0, requestIDs.length - 3);
  // console.log("These are the request ID's: ")
  // console.log(requestIDs)


  const result = await fetch(`https://api.spotify.com/v1/audio-features?ids=${requestIDs}`, {
    method: 'GET',
    headers: { 'Authorization' : 'Bearer ' + spotifytoken }
  });

  const data = await result.json();
  return data
  // console.log("Audio features: ")
  // console.log(data);
}

getRelevantSong = (songsToFilter, valence) => {
  songsToFilter.audio_features.forEach((song) => {
    console.log(song.valence);
  });
};


router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/keyword', async function(req, res) {
  
  global.keyword =  req.body.keyword;
  var qs = await quickstart();
  qs
  var token =  getToken();
  // var listOfSongs = 

  var getListOfSongs = await getListOfGenreSongs(token, global.finalValence, global.magnitude);
  getListOfSongs
  var finalSong = await getSongIDFromList(getListOfSongs, token, getRandomNumber());
  // var attributes = await getSongAttributes(songs, token);
  // getRelevantSong(attributes);

  // console.log(attributes.audio_features);

  global.song = finalSong;
  
  // console.log("Song attributes: ")
  // console.log(attributes)
  // console.log("Song valence: ")
  // console.log(attributes.valence)
  res.redirect('http://localhost:3000')
  // res.redirect('http://spotivibes.surge.sh/')

 });
 router.get('/song', function(req, res, next) {
  res.send(global.song);
});

module.exports = router;
