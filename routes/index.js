var express = require('express');
var router = express.Router();

/* GET home page. */
// index page
app.get('/', function(req, res) {
  res.render('pages/index');
});

module.exports = router;
