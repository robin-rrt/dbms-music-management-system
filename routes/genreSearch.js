var express = require('express');
var router = express.Router();

/* GET home page. */
// index page
router.get('/', function(req, res) {
    res.render('genreSearch', {title: 'Genre Search',})
});

module.exports = router;