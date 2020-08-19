var express = require('express');
var router = express.Router();
var request = require("request");


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/keyword', function(req, res) {
  var keyword = req.body.keyword;
  console.log(keyword);
   request(`https://api.spotify.com/v1/search?q=%22${keyword}%22&type=playlist&limit=1" -H "Accept: application/json" -H "Content-Type: application/json" -H "Authorization: Bearer BQC9uUE1DbqIfwQFyVeULezJZ5AbhXn_E8sBFlbAVIXpe4gb0wxBN03OAfLxHDVg6RpNihG_jXvsDtjEc3uM-sr74whKC3QKrvP4zFBacmXHB74Rx8Zh5RcqjrlsKjutmJ6SXw38iA7p3ygG`, function(error, response, body) {
    console.log("Hi im not in the if statemnet (i am in the request tho)")
    // if (!error && response.statusCode == 200) {
      // writing the response to a file named data.html
      var data = JSON.parse(this.response);
      console.log(data);
      // }
    
  });
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
