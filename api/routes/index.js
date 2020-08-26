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
  console.log("This is the result: ");
  console.log(result);
  console.log("End of result");

  // annotationsObject = {
  //   "joy": '',
  //   "sorrow": '',
  //   "anger": '',
  //   "surprise": ''
  // };

  let emotionArray = []

  if ((result.faceAnnotations[0].joyLikelihood) == "VERY_UNLIKELY") {
    emotionArray.push(0);
  }
  else if ((result.faceAnnotations[0].joyLikelihood) == "UNLIKELY") {
    emotionArray.push(1);
  }
  else if ((result.faceAnnotations[0].joyLikelihood) == "LIKELY") {
    emotionArray.push(2);
  }
  else if ((result.faceAnnotations[0].joyLikelihood) == "VERY_LIKELY") {
    emotionArray.push(3);
  }

  if ((result.faceAnnotations[0].sorrowLikelihood) == "VERY_UNLIKELY") {
    emotionArray.push(0);
  }
  else if ((result.faceAnnotations[0].sorrowikelihood) == "UNLIKELY") {
    emotionArray.push(1);
  }
  else if ((result.faceAnnotations[0].sorrowLikelihood) == "LIKELY") {
    emotionArray.push(2);
  }
  else if ((result.faceAnnotations[0].sorrowLikelihood) == "VERY_LIKELY") {
    emotionArray.push(3);
  }

  if ((result.faceAnnotations[0].angerLikelihood) == "VERY_UNLIKELY") {
    emotionArray.push(0);
  }
  else if ((result.faceAnnotations[0].angerLikelihood) == "UNLIKELY") {
    emotionArray.push(1);
  }
  else if ((result.faceAnnotations[0].angerLikelihood) == "LIKELY") {
    emotionArray.push(2);
  }
  else if ((result.faceAnnotations[0].angerLikelihood) == "VERY_LIKELY") {
    emotionArray.push(3);
  }

  if ((result.faceAnnotations[0].surpriseLikelihood) == "VERY_UNLIKELY") {
    emotionArray.push(0);
  }
  else if ((result.faceAnnotations[0].surpriseLikelihood) == "UNLIKELY") {
    emotionArray.push(1);
  }
  else if ((result.faceAnnotations[0].surpriseLikelihood) == "LIKELY") {
    emotionArray.push(2);
  }
  else if ((result.faceAnnotations[0].surpriseLikelihood) == "VERY_LIKELY") {
    emotionArray.push(3);
  }

  console.log(emotionArray);
  let i = emotionArray.indexOf(Math.max(...emotionArray));
  console.log(i)

  if (emotionArray.reduce == 0) {
    return "desk"
  }

  if (i == 0) {
    return "joy"
  }
  else if (i == 1) {
    return "sorrow"
  }
  else if (i == 2) {
    return "anger"
  }
  return "surprise"
  
  // console.log( `Min value: ${min}, max value: ${max}` );

  // annotationsObject["sorrow"] = result.faceAnnotations[0].sorrowLikelihood;
  // annotationsObject["anger"] = result.faceAnnotations[0].angerLikelihood;
  // annotationsObject["surprise"] = result.faceAnnotations[0].surpriseLikelihood;
  // console.log(annotationsObject);

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
  const text = global.keyword;

  const document = {
    content: text,
    type: 'PLAIN_TEXT',
  };

  // Detects the sentiment of the text
  const [result] = await clientLanguage.analyzeSentiment({document: document});
  const sentiment = result.documentSentiment;
  global.magnitude = sentiment.magnitude.toFixed(1);

  console.log(`Text: ${text}`);
  console.log(`Sentiment score: ${sentiment.score}`);
  console.log(`Sentiment magnitude: ${global.magnitude}`);

  const valence = (sentiment.score + 1) / 2
  global.finalValence = valence.toFixed(1);

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
  wordMagnitude = await magnitude;
  wordValence = await valence;
  console.log("this is word magnitude")
  console.log(wordMagnitude)
  console.log("this is word valence")
  console.log(wordValence)

  // switch statement to match 
  switch(wordValence) {    
    case "0.1":
      console.log("in 0.1")
      link = `https://api.spotify.com/v1/recommendations?limit=100&market=GB&seed_genres=trip-hop%2Csoul%2Cgarage&target_energy=${wordValence}&target_danceability=${wordValence}&target_valence=${wordValence}`;
      break
    case "0.2":
      console.log("in 0.2")
      link = `https://api.spotify.com/v1/recommendations?limit=100&market=GB&seed_genres=classical%2Cambient%2Cstudy&&target_energy=${wordValence}&target_danceability=${wordValence}&target_valence=${wordValence}`;
      break
    case "0.3":
      console.log("in 0.3")
      link = `https://api.spotify.com/v1/recommendations?limit=100&market=GB&seed_genres=reggae%2Csoul%2Cjazz&min_popularity=40&target_energy=${wordValence}&target_danceability=${wordValence}&target_valence=${wordValence}`;
      break
    case "0.4":
      console.log("in 0.4")
      link = `https://api.spotify.com/v1/recommendations?limit=100&market=GB&seed_genres=trip-hop%2Csoul%2Cr-n-b&min_popularity=40&target_energy=${wordValence}&target_danceability=${wordValence}&target_valence=${wordValence}`;
      break
    case "0.5":
      console.log("in 0.5")
      link = `https://api.spotify.com/v1/recommendations?limit=100&market=GB&seed_genres=trip-hop%2Csoul%2Cgarage&min_popularity=40&target_energy=${wordValence}&target_danceability=${wordValence}&target_valence=${wordValence}`;
      break
    case "0.6":
      console.log("in 0.6")
      link = `https://api.spotify.com/v1/recommendations?limit=100&market=GB&seed_genres=garage%2Cpop%2Chip-hop%2Canime&min_popularity=40&target_energy=${wordValence}&target_danceability=${wordValence}&target_valence=${wordValence}`;
      break
    case "0.7":
      console.log("in 0.7")
      link = `https://api.spotify.com/v1/recommendations?limit=100&market=GB&seed_genres=electronic%2Cgarage%2Cdeep-house&min_popularity=40&target_energy=${wordValence}&target_danceability=${wordValence}&target_valence=${wordValence}`;
      break
    case "0.8":
      console.log("in 0.8")
      link = `https://api.spotify.com/v1/recommendations?limit=100&market=GB&seed_genres=disco%2Cchill&min_popularity=40&target_energy=${wordValence}&target_danceability=${wordValence}&target_valence=${wordValence}`;
      break
    case "0.9":
      console.log("in 0.9")
      link = `https://api.spotify.com/v1/recommendations?limit=100&market=GB&seed_genres=trip-hop%2Csoul%2Cgarage&min_popularity=40&target_energy=${wordValence}&target_danceability=${wordValence}&target_valence=${wordValence}`;
      break
    default:
      console.log("this switch statement didn't work soz");
  }

  console.log(link)

  const result = await fetch(`${link}`, {
    method: 'GET',
    headers: { 'Authorization' : 'Bearer ' + spotifytoken }
  });

  const data = await result.json();

  return data

};

getSongIDFromList = async (listOfSongs, token, number) => {
  spotifyList = await listOfSongs;
  spotifytoken = await token;
  randomNumber = await number;
  songID = await spotifyList.tracks[randomNumber].id

  console.log(songID);
  return songID;
}

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/image', async function (req, res) {
  var image = req.files.filename.data;
  global.keyword = await visionAnalysis(image);
  var token =  getToken();
  var playlist = getPlaylist(token, keyword, getRandomNumber());
  var songs = await getSongIDsFromPlaylist(playlist, token, getRandomNumber());
  var attributes = await getSongAttributes(songs, token);
  getRelevantSong(attributes);
  
  res.redirect('http://localhost:3000');
})

router.post('/keyword', async function(req, res) {

  global.keyword =  req.body.keyword;
  var qs = await quickstart();
    qs
  var token =  getToken();
  var getListOfSongs = await getListOfGenreSongs(token, global.finalValence, global.magnitude);
  var finalSong = await getSongIDFromList(getListOfSongs, token, getRandomNumber());
  global.song = finalSong;
  res.redirect('http://localhost:3000')
  // res.redirect('http://spotivibes.surge.sh/')

 });

 router.get('/song', function(req, res, next) {
  res.send(global.song);
});

module.exports = router;
