/**
 *
 * Created by wg on 14/10/23.
 */
var async = require("async");
var current = 0;
var fetchUrl = function(url, callback){
    var delay = parseInt((Math.random()* 1000000) %2000, 10);
    current ++;
    console.log("now:", current, 'url:', url, 'delay:', delay);
    setTimeout(function(){
        current --;
        callback(null, url + 'html content');
    }, delay);
};

var urls = [];
for(var i=0; i<30; i++){
    urls.push("http://test"+i);
}
async.mapLimit(
    urls,
    5,
    function(url, callback){
        fetchUrl(url, callback);
    },
    function(err, result){
        console.log("finish all");
        console.log(result);
    }
);

