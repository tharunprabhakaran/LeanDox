/**
 * @name Dux Module
 * @description 
 *  -Dux Fetch
 *  -Dux Create
 *  -Dux Delete
 * @version 0.1
 * @author tharun_p
 */

 /**
  * @todo
  * - Create Request Schema Valdidation
  * - 
  */

/* Imports */
var express = require('express')
var XXHash = require('xxhash');
var Datastore = require('nedb')

/* Init */
var Dux = express.Router()
DB = new Datastore({ filename: './DUX.neDB', autoload: true });


/**
 * Fetch Dux
 * Fetches the DUX for a given ID
*/
Dux.get('/', function (Request, Response) {

    /* Check if Dux Exitst */
    DuxID = Request.query.id 
    DuxQueryPromise =  new Promise( (resolve, reject) => {
        DB.findOne({ _id: DuxID },  function (err, doc) {
            if(err){ reject(err) }
            else{ resolve(doc) }
        })
    });

    /* Handle Response */
    DuxQueryPromise.then( data => {
        if(data){
            data.status = "success"
            delete data["hash"] //Hide Hash of the DUX
            Response.json(data)
        }
        else{
            DuxQueryResponse ={
                "status": "failure",
                "errorCode": "QDTEC1001",
                "errorMessage": "No Dux Found"
            }
            Response.json(DuxQueryResponse)
        }
    })

    /* Erro Handling for Quering Data */
    DuxQueryPromise.catch( err => {
        DuxQueryResponse ={
            "status": "failure",
            "errorCode": "QDTEC1002",
            "errorMessage": err
        }
        Response.json(DuxQueryResponse)
    })
})

/**
 * Fetch All Dux Details
 */
Dux.get('/fetchAllId', function (Request, Response) {
    
    /* Query for Dux ID's */
    DuxQueryPromise =  new Promise( (resolve, reject) => {
        DB.find({},  function (err, doc) {
            if(err){ reject(err) }
            else{ resolve(doc) }
        })
    });

    /* Handle Response */
    DuxQueryPromise.then( data => {
        console.log(data)
        if(data){
            data.staus = "success"
            var stripedData = data.map( (dux) => {
                var stripedDux = {
                    "meta":dux.meta,
                    "id":dux._id,
                    "title":dux.title
                }
                return stripedDux
            })
            Response.json(stripedData)
        }
        else{
            DuxQueryResponse ={
                "status": "failure",
                "errorCode": "FATEC1001",
                "errorMessage": "No Dux Found"
            }
            Response.json(DuxQueryResponse)
        }
    })

    /* Erro Handling for Quering Data */
    DuxQueryPromise.catch( err => {
        DuxQueryResponse ={
            "status": "failure",
            "errorCode": "FATEC1002",
            "errorMessage": err
        }
        Response.json(DuxQueryResponse)
    })

})

/**
 * Create Dux
 * Creates a new Dux 
 */
Dux.post('/', function (Request, Response) {

    /* Calculate Hash of the DUX Payload */
    var DuxHash = XXHash.hash(new Buffer(JSON.stringify(Request.body)), 723498);
    
    /* Check if any Dux exist with same hash - Duplicacy Check */
    DuxQueryPromise =  new Promise( (resolve, reject) => {
        DB.findOne({ hash: DuxHash },  function (err, doc) {
            if(err){ reject(err) }
            else{ resolve(doc) }
        })
    });

    /* Handle Response */
    DuxQueryPromise.then( data => {
        // If Dux exist with same Hash, throw error Response
        if(data){
            Request.body.errorCode = "CDTEC1003"
            Request.body.errorMessage = "Data Already Exist"
            Request.body.staus = "failed"
            Response.json(Request.body)
        }
        // If Dux does not exist with same hash Insert into DB
        else{
            Request.body.hash = DuxHash
            // Dux Insert into DB
            DB.insert(Request.body, (err, dux) => {
                if(err){
                    Request.body.errorCode = "CDTEC1004"
                    Request.body.errorMessage = err
                    Request.body.staus = "failed"
                    Response.json(Request.body)
                }
                else{
                    Request.body.staus = "success"
                    Response.json(Request.body)
                }
            })
        }
    })

    /* Error Handle for Dux exist Check  */
    DuxQueryPromise.catch( err => {
        Request.body.errorCode = "CDTEC1002"
        Request.body.errorMessage = err
        Request.body.staus = "failed"
        Response.json(Request.body)
    })
})

//Delete Dux
Dux.delete('/', function (Request, Response) {
     
    /* Check if Dux Exitst */
     DuxID = Request.query.id 
     DuxQueryPromise =  new Promise( (resolve, reject) => {
        DB.remove({ _id: DuxID }, {},  function (err, doc) {
             if(err){ reject(err) }
             else{ resolve(doc) }
         })
     });
 
     /* Handle Response */
     DuxQueryPromise.then( data => {
         if(data){
             data.staus = "success"
             Response.json(data)
         }
         else{
             DuxQueryResponse ={
                 "status": "failure",
                 "errorCode": "DDTEC1001",
                 "errorMessage": "No Dux Found"
             }
             Response.json(DuxQueryResponse)
         }
     })
 
     /* Erro Handling for Quering Data */
     DuxQueryPromise.catch( err => {
         DuxQueryResponse ={
             "status": "failure",
             "errorCode": "DDTEC1002",
             "errorMessage": err
         }
         Response.json(DuxQueryResponse)
     })

    
})


module.exports = Dux