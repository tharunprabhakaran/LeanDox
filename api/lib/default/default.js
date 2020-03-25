/**
 * @name DEFAULT ROUTER
 * @description 
 *  -Default Router response is no path is mentioned
 *  -returns and vaild error code or reponse
 * @version 0.1
 * @author tharun_p
 */

/* Imports */
var express = require('express')
var defaultRouter = express.Router()

defaultRouter.get("/", (Request, Response) => {
    Response.json("Default Routing")
})

defaultRouter.get("/help", (Request, Response) => {
    Response.json("Default Routing Helper")
})

module.exports = defaultRouter