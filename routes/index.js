
/*
 * GET home page.
 */
var mysql      = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '84m2k3o4',
  database : 'nodejs'
});


function mySqlErr(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
 
  console.log('connected as id ' + connection.threadId);
}
connection.connect(mySqlErr);

var url = require('url');
var sitename = "GRAB13.ru";
var footer="&copy GRAB13";
var request = require("request");
var cheerio = require("cheerio");
var link = "http://s13.ru/";
exports.archive = function(req, res){
    var urlParsed = url.parse(req.url, true);
    if(urlParsed.query.js!="true"){
    connection.query('SELECT * FROM  `pages` WHERE link = "'+urlParsed.pathname+'"', function(err, rows, fields) {
    if (err) {console.log("SQL-ERROR!!!")};
    if(rows.length!=0){
          var pagedata = { title:rows[0].title, sitename:sitename, footer:footer, content:rows[0].content};
          res.setHeader('Cache-Control', 'max-age=7200');
          res.render('index', pagedata);
          createRequest.noneSQL=false;
          request(link+urlParsed.pathname, createRequest); 
        }
        else{
         createRequest.noneSQL=true;
         request(link+urlParsed.pathname, createRequest);}
    });
    }
    else{
      createRequest.noneSQL=true;
      request(link+urlParsed.pathname, createRequest);
    }
    function createRequest(error, response, body) {

      console.log(createRequest.noneSQL);
      if (!error) {
        if(response.statusCode == 200){
          var $ = cheerio.load(body,{decodeEntities: false});
          var posts="";
          $("a").each(function(i, elem){
              var hrefs=$(this).attr("href").split('/');
              if(hrefs[2]==="s13.ru"){
              $(this).attr("href",getNewHref(hrefs));
            }
            });
          $(".primary").each(function(i, elem){
              posts +=$(this).html();
          });
          var title = $("title").html();
          var pagedata = { title:title, sitename:sitename, footer:footer, content:posts};

          if(createRequest.noneSQL) {
            res.render('index', pagedata);
          }
          connection.query('DELETE FROM pages WHERE link = "'+urlParsed.pathname+'"' ,function(err, result) {
          if (err) console.error("IN1="+err.stack);
          });

          connection.query('INSERT INTO pages SET ?', {link: urlParsed.pathname, content:posts, title:title}, function(err, result) {
          if (err) console.error("IN2="+err.stack);
          });

        }
        else {
          if(response.statusCode == 404) res.status(404).render('index',{title:"Ошибка 404", sitename:sitename, footer:footer, content:"Страница не найдена!"});
        }
      }else {
          res.status(500).render('index', {title:"Ошибка", sitename:sitename, footer:footer, content:"Ошибка!"});
      }
    }

  //}
  //next();
}
function getNewHref(hrefs){
   newhref="";
              for (var i = 3; i<hrefs.length;i++) {
                  newhref+="/"+hrefs[i];
              }
  return newhref;
}