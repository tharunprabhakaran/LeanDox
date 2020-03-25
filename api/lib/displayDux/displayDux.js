/**
 * @name displayDux
 * @description 
 *  -Render the Dux in a json
 * @version 0.1
 * @author tharun_p
 */

 /* Imports */
var express = require('express')
var displayDuxRouter = express.Router()

/* Display Dux Landing Page */
displayDuxRouter.get("/", (Request, Response)=>{
    Response.json("displayDux Landing Page")
})

/* Display Dux Helper page */
displayDuxRouter.get("/help", (Request, Response) => {
    Response.json("displayDux Helper Page")
})

module.exports = displayDuxRouter