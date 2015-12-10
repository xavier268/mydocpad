/*******************************************
*      DOCPAD configuration file (js version)
*
*******************************************/
module.exports = {

  checkVersion : true,
  collections : {},
  templateData : {
        site: {
            url : "MyURLConfig",
            title:"MyTitleConfig ..."
        }
      },
  enabledPlugins : {
        marked : true,
        coffeescript:true,
        partials:true,
        eco:true
  }


};
