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
  wordMagnitude = await magnitude
  console.log("this is word magnitude")
  console.log(wordMagnitude)
  console.log("does word magnitude match???")
  console.log(wordMagnitude === "0.9")

  // switch statement to match 
  switch(wordMagnitude) {    
    case "0.1":
      console.log("in 0.1")
      link = `https://api.spotify.com/v1/recommendations?limit=100&market=GB&seed_genres=chill%2Cambient&min_tempo=60&max_tempo=80&target_valence=${valence}`;
      break
    case "0.2":
      console.log("in 0.2")
      link = `https://api.spotify.com/v1/recommendations?limit=100&market=GB&seed_genres=classical%2Cambient%2Cstudy&target_energy=0.2&min_popularity=50&min_tempo=60&max_tempo=80&target_valence=${valence}`;
      break
    case "0.3":
      console.log("in 0.3")
      link = `https://api.spotify.com/v1/recommendations?limit=100&market=GB&seed_genres=reggae%2Csoul%2Cjazz&min_popularity=50&target_valence=${valence}`;
      break
    case "0.4":
      console.log("in 0.4")
      link = `https://api.spotify.com/v1/recommendations?limit=100&market=GB&seed_genres=trip-hop%2Csoul%2Cr-n-b&min_popularity=50&target_valence=${valence}`;
      break
    case "0.5":
      console.log("in 0.5")
      link = `https://api.spotify.com/v1/recommendations?limit=100&market=GB&seed_genres=folk%2Cafrobeat%2Cpop&min_popularity=50&target_valence=${valence}`;
      break
    case "0.6":
      console.log("in 0.6")
      link = `https://api.spotify.com/v1/recommendations?limit=100&market=GB&seed_genres=garage%2Cpop%2Chip-hop%2Canime&min_popularity=50&target_valence=${valence}`;
      break
    case "0.7":
      console.log("in 0.7")
      link = `https://api.spotify.com/v1/recommendations?limit=100&market=GB&seed_genres=electronic%2Cgarage%2Cdeep-house&min_popularity=50&target_valence=${valence}`;
      break
    case "0.8":
      console.log("in 0.8")
      link = `https://api.spotify.com/v1/recommendations?limit=100&market=GB&seed_genres=emo%2Cdisco%2Crock&min_popularity=50&target_valence=${valence}`;
      break
    case "0.9":
      console.log("in 0.9")
      link = `https://api.spotify.com/v1/recommendations?limit=100&market=GB&seed_genres=jazz&min_popularity=50&target_valence=${valence}`;
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
