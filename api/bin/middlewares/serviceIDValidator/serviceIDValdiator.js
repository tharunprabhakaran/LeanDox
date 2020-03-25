/**
 * @name serviceIDValidator
 * @description
 *  -Validated the ServiceID of every request
 * @version 0.1
 * @author tharun_p
 */

 function validate(Request, Response, next){
     console.log("Service Validator ")
     next()
 }

 module.exports = {
     validate
 }