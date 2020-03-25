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
var createDuxRouter = express.Router()

//CreateDux Landing Page
createDuxRouter.get('/', function (Request, Response) {
    Response.json('Create Dux Landing Page')
})

//CreateDux Helper Page
createDuxRouter.get('/help', function (Request, Response) {
    Response.json('Create Duxx help')
})

module.exports = createDuxRouter