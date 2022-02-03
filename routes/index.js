var express = require('express');
var router = express.Router();

/* GET home page. */
// index page
router.get('/', function(req, res) {
  if(req.userContext){
    res.render('index', {title: 'MUZIKI Authentication',
    userinfo: req.userinfo,})
  }
  else{
    res.render('login', {title: 'MUZIKI Authentication'})
  }
});

module.exports = router;

// var express = require('express');
// var router = express.Router();

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

// module.exports = router;
