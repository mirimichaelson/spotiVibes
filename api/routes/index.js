var express = require('express');
var router = express.Router();
var request = require("request");
const fetch = require("node-fetch");
var btoa = require("btoa");
const { RequestHeaderFieldsTooLarge } = require('http-errors');
const fileUpload = require('express-fileupload');

// default options
'use strict';

async function visionAnalysis(fileName) {
  // [START vision_face_detection]
  // Imports the Google Cloud client library
  const vision = require('@google-cloud/vision');

  // Creates a client
  const client = new vision.ImageAnnotatorClient();

  /**
   * TODO(developer): Uncomment the following line before running the sample.
   */
  // const fileName = 'Local image file, e.g. /path/to/image.png';

  const [result] = await client.faceDetection(fileName);
  const faces = result.faceAnnotations;
  console.log(result);
  console.log('Faces:');
  faces.forEach((face, i) => {
    console.log(`  Face #${i + 1}:`);
    console.log(`    Joy: ${face.joyLikelihood}`);
    console.log(`    Anger: ${face.angerLikelihood}`);
    console.log(`    Sorrow: ${face.sorrowLikelihood}`);
    console.log(`    Surprise: ${face.surpriseLikelihood}`);
  });
  // [END vision_face_detection]
  // visionAnalysis(...process.argv.slice(2));
}

// visionAnalysis(...process.argv.slice(2));

const clientID = "040d08f49da545b9b0e32795e0dd8372";
const clientSecret = "dc95f53d92534300adcec5a4fefe089f";

async function quickstart() {
  // Imports the Google Cloud client library
  const language = require('@google-cloud/language');

  // Instantiates a client
  const clientLanguage = new language.LanguageServiceClient();

  // The text to analyze
  const text = 'Hello, world!';

  const document = {
    content: text,
    type: 'PLAIN_TEXT',
  };

  // Detects the sentiment of the text
  const [result] = await clientLanguage.analyzeSentiment({document: document});
  const sentiment = result.documentSentiment;

  console.log(`Text: ${text}`);
  console.log(`Sentiment score: ${sentiment.score}`);
  console.log(`Sentiment magnitude: ${sentiment.magnitude}`);
}


function getRandomNumber() {  
  return Math.floor(
    Math.random() * (5 - 1 + 1) + 1

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

getPlaylist = async (token, keyword, number) => {
  spotifytoken = await token;
  randomNumber = await number;
  const result = await fetch(`https://api.spotify.com/v1/search?q=%22${keyword}%22&type=playlist&market=GB&limit=1&offset=${randomNumber}`, {
    method: 'GET',
    headers: { 'Authorization' : 'Bearer ' + spotifytoken }
  });
  const data = await result.json();
  return data.playlists.items[0].id;

};

getSongIDsFromPlaylist = async (playlist, token, number) => {
  spotifyPlaylist = await playlist;
  spotifytoken = await token;
  randomNumber = await number;
  const result = await fetch(`https://api.spotify.com/v1/playlists/${spotifyPlaylist}/tracks?limit=50`, {

    method: 'GET',
    headers: { 'Authorization' : 'Bearer ' + spotifytoken }
  });
  const data = await result.json();

  var songs = data.items;
  var songIDs = [];

  songs.forEach((song) => {
    songIDs.push(song.track.id);
  });
  // console.log(songIDs);
  return songIDs;
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

router.post('/image', async function (req, res) {
  console.log(req.files);
  var image = req.files.filename.data;
  // console.log(image);
  visionAnalysis(image);
  res.redirect('http://localhost:3000')
})

router.post('/keyword', async function(req, res) {
  var keyword =  req.body.keyword;
  var token =  getToken();
  var playlist = getPlaylist(token, keyword, getRandomNumber());
  var songs = await getSongIDsFromPlaylist(playlist, token, getRandomNumber());
  var attributes = await getSongAttributes(songs, token);
  getRelevantSong(attributes);
  // visionAnalysis();
  // quickstart();
  // visionAnalysis();
  // console.log(attributes.audio_features);


  // global.song = finalSong;
  
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
