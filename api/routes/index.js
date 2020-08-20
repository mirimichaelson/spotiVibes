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
  console.log("data inside getToken")
  console.log(data)
  return data.access_token;

};

getSong = async (token, keyword) => {

  const result = await fetch(`https://api.spotify.com/v1/search?q=%22${keyword}%22&type=playlist&market=UK&limit=1`, {
    method: 'GET',
    headers: { 'Authorization' : 'Bearer ' + token }
  });
  console.log("token inside getSong")
  console.log(token)
  const data = await result.json();
  console.log(data);
  return data;

}



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/keyword', function(req, res) {
  var keyword = req.body.keyword;
  var token = getToken();
  var result = getSong(token, keyword);
  console.log(result);
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
