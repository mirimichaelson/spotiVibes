var express = require('express');
var router = express.Router();
var request = require("request");
const fetch = require("node-fetch");
var btoa = require("btoa");


const clientID = "040d08f49da545b9b0e32795e0dd8372";
const clientSecret = "dc95f53d92534300adcec5a4fefe089f";


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

getPlaylist = async (token, keyword) => {
  spotifytoken = await token;
  const result = await fetch(`https://api.spotify.com/v1/search?q=%22${keyword}%22&type=playlist&market=GB&limit=1`, {
    method: 'GET',
    headers: { 'Authorization' : 'Bearer ' + spotifytoken }
  });
  const data = await result.json();
  return data.playlists.items[0].id;

}

getSongFromPlaylist = async (playlist, token) => {
  spotifyPlaylist = await playlist;
  spotifytoken = await token;
  const result = await fetch(`https://api.spotify.com/v1/playlists/${spotifyPlaylist}/tracks?limit=1`, {
    method: 'GET',
    headers: { 'Authorization' : 'Bearer ' + spotifytoken }
  });
  const data = await result.json();
  console.log("TRACK ID BITCHES")
  console.log(data.items[0].track.id)
  return data.items[0].track.id;

}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/keyword', function(req, res) {
  var keyword = req.body.keyword;
  var token = getToken();
  var playlist = getPlaylist(token, keyword);
  var song = getSongFromPlaylist(playlist, token);
  console.log(song);
 });

//   // console.log(res);
//   request.on = function () {
//     var data = JSON.parse(this.response)
//     console.log(data)
//     // "playlists": {
//     // "items": [
//     //   "id": "THIS PLAYLIST_ID"
//   }
//   res.redirect('/')



module.exports = router;
