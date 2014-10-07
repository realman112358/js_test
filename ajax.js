function ajax_get(url, param, back_call){
    var time=new Date();
    var timestamp = time.getTime();
    param["timestamp"]=timestamp;
    $.get(url, param,back_call);
}
function ajax_post(url, param, back_call){
    var time=new Date();
    var timestamp = time.getTime();
    param["timestamp"]=timestamp;
    $.post(url, param,back_call);
}
var $ = require("jquery");

var test_object = {
    '20140822':10.0, '20140823':2.0, '20140508':3.0
};
test_object['20140822'] = 10.0;
test_object['20140823'] = 10.0;
var test_object_string = JSON.stringify(test_object);
function getData(){
    var http = require('http');
    var str = '';

    var options = {
        host: 'www.random.org',
        path: '/integers/?num=1&min=1&max=10&col=1&base=10&format=plain&rnd=new'
    };

    callback = function(response) {

        response.on('data', function (chunk) {
            str += chunk;
        });

        response.on('end', function () {
            console.log(str);
        });

        //return str;
    }

    var req = http.request(options, callback).end();

    // These just return undefined and empty
    console.log(req.data);
    console.log(str);
}
getData();
