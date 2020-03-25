/**
 * @name LeanDux 
 * @description Facade layer for all the modules
 * @version 0.1
 * @author tharun_p
 */

/* Import */
var express = require('express');
var fs = require('fs');

/* Module Imports */
var defaultRouter = require('./lib/default/default')
var createDuxRouter = require('./lib/createDux/createDux')
var queryDuxRouter = require('./lib/queryDux/queryDux')
var displayDuxRouter = require('./lib/displayDux/displayDux')

/* Middleware Imports */
var logger = require('./bin/middlewares/logging/logger')
var serviceIDValidator = require('./bin/middlewares/serviceIDValidator/serviceIDValdiator')
/* Global Constants */
var PORT = process.env.PORT || 3000

/* Initilisation */
var app = express()


/* Middleware */

// 1. Logger
app.use(logger.log)

// 2.  ServiceID Validation 
app.use(serviceIDValidator.validate)


/* Controller */

// DEFAULT Router
app.use("/", defaultRouter)

// CreateDux Router
app.use('/createDux',createDuxRouter);

// QueryDux Router
app.use('/queryDux',queryDuxRouter);

//Display Router
app.use('/displayDux',displayDuxRouter);



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