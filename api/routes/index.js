var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/keyword',(req, res) => {
  var keyword = req.body.keyword;
  console.log(keyword);
  res.redirect('/')
});

module.exports = router;
