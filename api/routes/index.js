var express = require('express');
var router = express.Router();
var request = require("request");
const fetch = require("node-fetch");
var btoa = require("btoa");


const clientID = "040d08f49da545b9b0e32795e0dd8372";
const clientSecret = "dc95f53d92534300adcec5a4fefe089f";


function getRandomNumber() {  
  return Math.floor(
    Math.random() * (50 - 1 + 1) + 1
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
  console.log(`This is my access token: ${data.access_token}`);
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

}

getSongFromPlaylist = async (playlist, token, number) => {
  spotifyPlaylist = await playlist;
  spotifytoken = await token;
  randomNumber = await number;
  const result = await fetch(`https://api.spotify.com/v1/playlists/${spotifyPlaylist}/tracks?limit=1&offset=${randomNumber}`, {
    method: 'GET',
    headers: { 'Authorization' : 'Bearer ' + spotifytoken }
  });
  const data = await result.json();
  console.log("TRACK ID BITCHES")
  console.log(data.items[0].track.id)
  return data.items[0].track.id;

}

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/keyword', async function(req, res) {
  var keyword =  req.body.keyword;
  var token =  getToken();
  var playlist = getPlaylist(token, keyword, getRandomNumber());
  global.song = await getSongFromPlaylist(playlist, token, getRandomNumber());
  res.redirect('http://localhost:3000')
 });
 router.get('/song', function(req, res, next) {
  res.send(global.song);
});

module.exports = router;
