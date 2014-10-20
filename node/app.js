var express = require('express');
var utility = require('utility');
var superagent = require('superagent');
var event = require('eventproxy');
var url = require('url');
var cnodeurl = 'https://cnodejs.org';
var cheerio = require('cheerio');
superagent.get(cnodeurl).end(function(err, res){
    if(err){
        console.log(err);
    }
    var topicUrls = [];
    var $ = cheerio.load(res.text);
    $('#topic_list .topic_title').each(function(idx, element){
        var $element = $(element);
        var href = url.resolve(cnodeurl,$element.attr('href'));
        topicUrls.push(href);
    }) ;
    console.log(topicUrls);
    var ep = new event();
    ep.after('get_all', topicUrls.length, function(list){
        var result = [];
        result = list.map(function(topicPair){
            var topicUrl = topicPair[0];
            var topicHtml = topicPair[1];
            var $ = cheerio.load(topicHtml);
            return ({
                title:$('.topic_full_title').text().trim(),
                href:topicUrl,
                comment1:$('.reply_content').eq(0).text().trim(),
            });
        });
        console.log(result);
    });
    /*for(var i=0; i< topicUrls.length; i++){
        superagent.get(topicUrls[i]).end(function(err, res){
            console.log("load1");
            ep.emit('get_all', [topicUrls[i], res.text]);
        });
    }
    */
    topicUrls.forEach(function(topicUrl){
        superagent.get(topicUrl).end(function(err, res){
            console.log("load1");
            ep.emit('get_all', [topicUrl, res.text]);

        }) ;
    });

});


