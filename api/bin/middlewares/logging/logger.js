/**
 * @name looger
 * @description
 *  -Logs every Request
 * @version 0.1
 * @author tharun_p
 */

 function log(Request, Response, next){
     console.log("TIME : "+ Date.now())
     next()
 }

 module.exports={
     log
 }
