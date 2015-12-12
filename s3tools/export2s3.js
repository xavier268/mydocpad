"use strict";
/******************************************************
*   Export statically generated pages to AWS S3
*   Credentials should be available locally in ~/.aws/credentials
******************************************************/

const TARGET = "test.gandillot.com";  // Adjsut as needed.
const REGION = "eu-west-1"; // Adjust as needed, but REQUIRED !
const UP = "\x1B[1A"; // Move 1 line up when printed ...
const CLEAR = "\x1B[2J"; // Clear screen
const S = "\x1B[s"; // Save cursor pos
const U = "\x1B[u"; // Restore cursor pos
const K = "\x1B[K"; // Kill rest of line

var walk = require('walk-fs');
var aws = require("aws-sdk"); aws.config.update({region: REGION});
var s3 = new aws.S3();
var fs = require("fs");


console.log("Preparing to export 'out/' to s3 bucket ", TARGET );
console.log("The bucket must exist, and you must have the following access rights : ");
console.log("---------------------------\n",{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": "s3:ListAllMyBuckets",
            "Resource": "arn:aws:s3:::*"
        },
        {
            "Effect": "Allow",
            "Action": [
                "s3:ListBucket",
                "s3:GetBucketLocation",
                "s3:GetBucketWebsite",
                "s3:PutBucketWebsite"
            ],
            "Resource": "arn:aws:s3:::"+TARGET
        },
        {
            "Effect": "Allow",
            "Action": [
                "s3:PutObject",
                "s3:GetObject",
                "s3:DeleteObject",
                "s3:PutObjectAcl"
            ],
            "Resource": "arn:aws:s3:::"+TARGET+"/*"
        }
    ]
},"\n---------------------------");

configureWebsite("error.html","index.html");
save();

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


s3.getBucketWebsite({'Bucket':TARGET},function(err,data){
  if(err) {console.log("Error getting website configuration : ",err);throw err;}
  console.log("Web configuration : ",data);
});

*/







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
        if(path.match(/\.t()?xt$/i)) return "text/plain; charset=utf-8";
        if(path.match(/\.md$/i)) return "text/plain; charset=utf-8";
        if(path.match(/\.map$/i)) return "text/plain; charset=utf-8";
        if(path.match(/\.js$/i)) return "application/javascript";
        if(path.match(/\.json$/i)) return "application/json";
        if(path.match(/\.svg$/i)) return "image/svg+xml";
        if(path.match(/\.png$/i)) return "image/png";
        if(path.match(/\.jp(e)?g$/i)) return "image/jpeg";
        if(path.match(/\.gif$/i)) return "image/gif";
        if(path.match(/ss$/i)) return "text/css";
        if(path.match(/rc$/i)) return "text/plain; charset=utf-8";
        if(path.match(/ml$/i)) return "application/xml";

        if(path.match(/license$/i)) return "text/plain; charset=utf-8";

        return "application/octet-stream";
  }


//==================================================================
// Configure bucket for website hosting.
// Parameters are the error and index pages names.

  function configureWebsite(error,index) {
      var websiteParams = {
        Bucket: TARGET,
        WebsiteConfiguration: {
          ErrorDocument: {
            Key: error
          },
          IndexDocument: {
            Suffix: index
          }
        }
      };
      s3.putBucketWebsite(
          websiteParams, (err,data)=>{
            if(err) {console.log("Error when trying to configure website :",err);throw err;}
            console.log(K, "Website correctly configured");
          });
  }




//============================================================================
      // Send file given by its absolute path to the key location
      function send2s3 (data, contentType, key) {
        if(!key) {
            console.log("Error - key cannont be empty !");
            throw new Error("Trying to send an empty key to S3");
            }
        s3.putObject({
              'Bucket':TARGET,
              'Key':key,
              'ACL':'public-read',
              'Body':data,
              'ContentType':contentType
            },(err,data)=>{
            if(err) {console.log("Error while sending : ",err);throw err;}
            console.log(S,K," Exporting ",contentType,"\t", key,U,UP);
          });

      }
