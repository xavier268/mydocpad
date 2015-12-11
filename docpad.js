"use strict";

// globals @getCollection

/*******************************************
*      DOCPAD configuration file (js version)
*
*******************************************/
module.exports = {

  checkVersion : true,
  collections : {
    },
  filesPaths: [     // Where to get static files from ...
        'files',
        '../bower_components/'      // Copy bower_components dist files  to out/
    ],
  templateData : {
          site: {
                url : "MyURLConfig",
                title:"MyTitleConfig ..."
                },
          toEnglish : toEnglish,
          toFrench : toFrench
        },
  enabledPlugins : {
        marked : true,
        coffeescript:true,
        partials:true,
        eco:true
        },
  plugins:{
        multilang: {
          languages : ["fr","en"]
          }
        }

};

/****************** helper functions *****************************/

// Being provided with a document, it returns the url to the same doc in English
function toEnglish(doc) {
  if(!doc ) return "#";
  var s = "/" + doc.relativeOutPath; // there is no leading "/" when called directly ...
  if(!s.match(/^\/fr\//)) return "#";
  return s.replace("/fr/","/en/");
}


// Being provided with a document, it returns the url to the same doc in French
function toFrench(doc) {
  if(!doc) return "#";
  var s = "/" + doc.relativeOutPath; // there is no leading "/" when called directly ...
  if(!s.match(/^\/en\//)) return "#";
  return s.replace("/en/","/fr/");
}
