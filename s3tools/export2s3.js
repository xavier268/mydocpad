"use strict";
/******************************************************
*   Export statically generated pages to AWS S3
*   Credentials should be available locally in ~/.aws/credentials
******************************************************/

var TARGET = "test.gandillot.com";  // Adjsut as needed.
var REGION = "eu-west-1"; // Adjust as needed, but REQUIRED !

var walk = require('walk-fs');
var aws = require("aws-sdk"); aws.config.update({region: REGION});
var s3 = new aws.S3();
var fs = require("fs");

console.log("Preparing to export 'out/' to s3 bucket ", TARGET );
console.log("  - Make sure you make everything 'public' and configure your web howting parameters ...");

save();

console.log("\n\nREMEMBER - Make sure you make everything 'public' and configure your web howting parameters ...\n");


/*
// For debugging purposes only ...

s3.listBuckets(function(err, data) {
  if (err) { console.log("Error - connot list buckets ?", err); }
  else {
    console.log("Listing buckets : ");
    for (var index in data.Buckets) {
      var bucket = data.Buckets[index];
      console.log( bucket.Name);
    }
  }
});


s3.headBucket({'Bucket':TARGET},function(err,data){
  console.log("Checking access to " + TARGET);
  if(err){console.log("Error accessing bucket : ",err);return;}
  console.log("Ok ! ");
});


s3.listObjects({'Bucket':TARGET},function(err,data){
    console.log("Listing content for target bucket :");
    if(err) {console.log("Error : ",err);return;}
    console.log(data.Contents);
});
*/

// Let's parse out/ directory ...







//================ helpers ==========================================


function save() {

  walk(__dirname + "/../out",
      function(path, stats) {
        if(stats.isFile()) { // Ignore directories ...
            var key = path.replace(/^.*\/out\//,"");
            // console.log(path," => " ,key);
            fs.readFile(path, (err,data) => {
              if(err) {console.log(err); throw err;}
              send2s3(data,getContentType(key), key);
            });

            }
          return true ; // to continue iteration ..
          },
      function(err) {
          if(err) throw err;
          }
      );
  }


      function getContentType(path) {
        if(! path) return "application/octet-stream";
        if(path.match(/\.html?$/i)) return "text/html";
        if(path.match(/\.js?$/i)) return "application/javascript";
        if(path.match(/\.json?$/i)) return "application/json";
        if(path.match(/\.svg?$/i)) return "image/svg+xml";
        if(path.match(/\.png?$/i)) return "image/png";
        if(path.match(/\.jp(e)?g?$/i)) return "image/jpeg";
        if(path.match(/\.gif$/i)) return "image/gif";
        if(path.match(/ss$/i)) return "text/css";

        return "application/octet-stream";
  }


      // Send file given by its absolute path to the key location
      function send2s3 (data, contentType, key) {
        if(!key) {
            console.log("Error - key cannont be empty !");
            throw new Error("Trying to send an empty key to S3");
            }
        s3.putObject({'Bucket':TARGET,'Key':key,'Body':data, 'ContentType':contentType},
          function(err,data){
            if(err) {console.log("Error while sending : ",err);throw err;}
            console.log(contentType," ", key);
          });

      }
