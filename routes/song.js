var express = require('express');
var router = express.Router();

/* GET home page. */
// index page
router.get('/', function(req, res) {
    res.render('songView', {title: 'SONG NAME',})
});

module.exports = router;
