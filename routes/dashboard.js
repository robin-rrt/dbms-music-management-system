const express = require('express')
const { startCase } = require('lodash')

const router = express.Router()

router.get('/dashboard', (req, res, next) => {
  const descriptionList = Object.keys(req.userinfo).sort()
    .map(key => ({
      term: startCase(key),
      details: (key === 'updated_at' ? new Date(req.userinfo[key] * 1000) : req.userinfo[key]),
    }))

  res.render('dashboard', {
    title: 'Dashboard',
    descriptionList,
    userinfo,
  })
})

module.exports = router
