var express = require('express');
var router = express.Router();
var request = require("request");


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/keyword',(req, res) => {
  var keyword = req.body.keyword;
  console.log(keyword);
  request.get(`https://api.spotify.com/v1/search?q=%22${keyword}%22&type=playlist" -H "Accept: application/json" -H "Content-Type: application/json" -H "Authorization: Bearer`, true)
  // console.log(res);
  request.on = function () {
    var data = JSON.parse(this.response)
    console.log(data)
    // "playlists": {
    // "items": [
    //   "id": "THIS PLAYLIST_ID"
  }
  res.redirect('/')
});

module.exports = router;
