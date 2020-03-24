/**
 * @name createDux
 * @description 
 *  -createDux modules is used to create new Dux in the system, 
 *  -which accepts data in editor.js format.
 * @version 0.1
 * @author tharun_p
 */


/* Imports */
var express = require('express')
var router = express.Router()

//CreateDux Landing Page
router.get('/', function (req, res) {
  res.send('Create Dux Landing Page')
})

//CreateDux Helper Page
router.get('/help', function (req, res) {
  res.send('Create Dux help')
})

module.exports = router