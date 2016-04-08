
/*
 * GET home page.
 */
var url = require('url');
//var grab = require('./../grab');
var sitename = "GRAB13.ru";
var footer="&copy GRAB13";
var request = require("request");
var cheerio = require("cheerio");
var link = "http://s13.ru/";
/*exports.index = function(req, res){
  var urlParsed = url.parse(req.url, true);
  var numberpage = 1;
  if(urlParsed.query.page) numberpage = urlParsed.query.page;
  request(link, function (error, response, body) {
    	if (!error) {
        	var $ = cheerio.load(body);
        	var posts="";
            $("a").each(function(i, elem){
              var hrefs=$(this).attr("href").split('/');
              $(this).attr("href","/"+hrefs[hrefs.length-2]+"/"+hrefs[hrefs.length-1]);
            });
            $(".item").each(function(i, elem){

            	posts +=$(this).html();
            });

            res.render('index', { title:"Домашняя", sitename:sitename, footer:footer, content:posts});
    	} else {
        	
    	}
    });
}*/
exports.archive = function(req, res){
    var urlParsed = url.parse(req.url, true);
    //var pPath=urlParsed.pathname.split('/');
   // if(pPath[1]==="archives"){
    //res.render('index', { title:"Архив", sitename:sitename, footer:footer, content:"archive:"+pPath[2]});
      request(link+urlParsed.pathname, function (error, response, body) {
      if (!error) {
          var $ = cheerio.load(body);
          var posts="";
          $("a").each(function(i, elem){
              var hrefs=$(this).attr("href").split('/');
              $(this).attr("href","/"+hrefs[hrefs.length-2]+"/"+hrefs[hrefs.length-1]);
              console.log(link);
            });
          $(".primary").each(function(i, elem){
              posts +=$(this).html();
            });
          var title = $("title").html();
          
          res.render('index', { title:title, sitename:sitename, footer:footer, content:posts});
      }else {
          
      }
    });
  //}
  //next();
}