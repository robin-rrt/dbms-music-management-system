var express = require('express');
var router = express.Router();

/* GET home page. */
// index page
app.get('/', function(req, res) {
  if(req.userContext){
    res.render('pages/auth', {title: 'MUZIKI Authentication',
    userinfo: req.userinfo,})
  }
  else{
    res.render('login', {title: 'Express'})
  }
});

module.exports = router;
