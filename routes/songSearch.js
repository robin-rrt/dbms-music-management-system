var express = require('express');
var router = express.Router();

/* GET home page. */
// index page
router.get('/', function(req, res) {
    res.render('search', {title: 'MUZIKI',})
});

module.exports = router;
