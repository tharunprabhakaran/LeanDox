/**
 * @name LeanDux 
 * @description Facade layer for all the modules
 * @version 0.1
 * @author tharun_p
 */

/* Import */
var express = require('express');
var bodyParser = require('body-parser')
var fs = require('fs');

/* Module Imports */
var defaultRouter = require('./lib/default/default')
var Dux = require('./lib/Dux/Dux')
var IAM = require('./lib/IAM/IAM')


/* Middleware Imports */
var logger = require('./bin/middlewares/logging/logger')

/* Global Constants */
var PORT = process.env.PORT || 3000

/* Initilisation */
var app = express()


/* Middleware */

//1. Body-Parser
app.use(bodyParser.json())
// 2. Logger
app.use(logger.log)

// 2.  ServiceID Validation 
//app.use(serviceIDValidator.validate)


/* Controller */

// DEFAULT Router
app.use("/", defaultRouter)

// Dux Router
app.use('/dux',Dux);

// QueryDux Router
app.use('/userManagement',IAM);


/* Server Startup*/
app.listen(PORT,()=>{
    console.log("Server Started : ",PORT)
    var PIDFileMessage = 
        "PID : "+process.pid
        +" || PORT : "+PORT
        +" || ON : "+new Date().toTimeString()
        +" || FILE : Index.js"
    fs.writeFileSync("PID",PIDFileMessage)
    
})