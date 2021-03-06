const express = require('express')
const { startCase } = require('lodash')

const router = express.Router()
try{
router.get('/', (req, res, next) => {
  const descriptionList = Object.keys(req.userinfo).sort()
    .map(key => ({
      term: startCase(key),
      details: (key === 'updated_at' ? new Date(req.userinfo[key] * 1000) : req.userinfo[key]),
    }))
    console.log("!!!!!!!!!!!!!!!!!!!!Dashboard variables are set!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");

  res.render('dashboard', {
    title: 'Dashboard',
    descriptionList,
    userinfo,
  })


})
}
catch(e){
  console.log(err.stack);
}
module.exports = router
