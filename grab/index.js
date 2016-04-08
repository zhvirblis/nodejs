var request = require("request");
var cheerio = require("cheerio");
var link = "http://s13.ru/";
exports.grab = function(err, posts){
	request(link, function (error, response, body) {
    	if (!error) {
        	var $ = cheerio.load(body);
            $(".item").each(function(i, elem){
            	posts +=$(this).html();
            });
    	} else {
        	
    	}
    });
    console.log(posts);
}