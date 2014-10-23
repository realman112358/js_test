var express = require('express');
var utility = require('utility');
var superagent = require('superagent');
var event = require('eventproxy');
var url = require('url');
var fs = require('fs');
//var cnodeurl = 'http://mm.taobao.com/self/album_photo.htm?spm=719.6642053.0.0.eESsmf&user_id=59635828&album_id=10000157440&album_flag=0';
//var cnodeurl = "www.cnbeta.com";
//var cnodeurl = 'http://localhost/test/test.html';
var url ='http://mm.taobao.com/album/json/get_photo_list_tile_data.htm?user_id=59635828&album_id=10000157440&page=';
var cheerio = require('cheerio');
var index = 0;
for(var i=1; i< 14; i++) {
    var new_url = url + i;
    superagent.get(new_url).end(function (err, res) {
        if (err) {
            console.log(err);
        }
        var topicUrls = [];
        var $ = cheerio.load(res.text);
        $('img').each(function (idx, element) {
            var $element = $(element);
            var src = $element.attr("src");
            if (src == undefined) {
                src = $element.attr("data-src");
            }
            if (src != undefined) {
                topicUrls.push(src);
            }
        });
        console.log(topicUrls);
        var ep = new event();
        ep.after('get_all', topicUrls.length, function (list) {
            console.log("fin all");
        });

        topicUrls.forEach(function (topicUrl) {
            superagent.get(topicUrl).end(function (err, res) {
                if (err) {
                    console.log("get image failed");
                    return;
                }
                index++;
                fs.writeFile("download/" + index + ".jpg", res.body, 'binary', function (err) {
                    if (err) {
                        console.log("write file failed");
                    }
                    console.log('file saved');
                });
                ep.emit('get_all', "");

            });
        });

    });
}


