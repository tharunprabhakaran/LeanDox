/**
 * @name LeanDux 
 * @description Facade layer for all the modules
 * @version 0.1
 * @author tharun_p
 */


/* Import */
var express = require('express');
var fs = require('fs');

/* Global Constants */
var PORT = process.env.PORT || 3000

/* Initilisation */
var app = express()



/* Server Startup*/
app.listen(PORT,()=>{
    console.log("Server Started : ",PORT)
    var PIDFileMessage = "PID : "+process.pid+" || PORT : "+PORT+" || ON : "+new Date().toTimeString()+" || FILE : Index.js"
    fs.writeFileSync("index.pid",PIDFileMessage)
    
})