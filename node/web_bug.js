var express = require('express');
var util = require('util');
var utility = require('utility');
var eventproxy = require('eventproxy');
var superagent = require('superagent');
var event = require('eventproxy');
var url = require('url');
var fs = require('fs');
var async = require("async");

var user_id = 545121555;
var page_id = 1;
var  album_url_module= "http://mm.taobao.com/self/album/open_album_list.htm?_charset=utf-8&user_id=%s&page=%s";
var album_url = util.format(album_url_module, user_id, page_id);
var img_url_module = "http://mm.taobao.com/album/json/get_photo_list_tile_data.htm?user_id=%s&album_id=%s&page=%s";
var album_list = [];
var cheerio =  require('cheerio');
console.log(album_url);
var ep = new eventproxy();
superagent.get(album_url).end(function(err, res){
    console.log("");
    if(err){
        console.log(err);
    }  else{
        var $ = cheerio.load(res.text);
        $("div .mm-photo-cell a").each(function(idx, element){
            var $a = $(element);
            var href = $a.attr('href');
            var album_id = href.match(/(.*)&album_id=(\d+)&(.*)/)[2];
            if(album_list.indexOf(album_id) === -1){
                album_list.push(album_id);
            }
        });
        console.log(album_list);
        //for test(make data less)
        //album_list = ['301084252', '10000104273'];
        ep.after('all_fin', album_list.length, all_fin);
        album_list.forEach(function(element){
           get_album_page_num(element);
        });
    }
});
var img_list = {};
var page_target_list = {};
var page_done_list = {};
function get_album_page_num(album_id){
    var page_id = 1;
    var album_url = util.format(img_url_module, user_id, album_id, page_id);
    superagent.get(album_url).end(function(err, res) {
        if (err) {
            console.log(err);
        } else {
            var $ = cheerio.load(res.text);
            var totalPage = $("#J_Totalpage").attr('value');
            page_target_list[album_id] = totalPage;
            page_done_list[album_id] = 0;
            console.log('album:', album_id, 'has page:', totalPage);
            search_album(album_id, totalPage);
        }
    });
}
function search_album(album_id, total_page){
    var album_img_res = {};
    var album_img_list = [];
    album_img_res.album_id = album_id;
    album_img_res.imgs = album_img_list;

    var page_list = [];
    for(var page_id = 1; page_id <= total_page; page_id++ ) {
       page_list.push(page_id);
    }
    page_list.forEach(function(current_page){
        var album_url = util.format(img_url_module, user_id, album_id, current_page);
        superagent.get(album_url).end(function (err, res) {
            if (err) {
                console.log(err);
            } else {
                var $ = cheerio.load(res.text);
                $("img").each(function (idx, element) {
                    var $img = $(element);
                    $src = $img.attr('src');
                    album_img_list.push($src);
                });
                console.log('album_id:', album_id,'page_id:', current_page, 'done');
                page_done_list[album_id]++;
                if(page_done_list[album_id] == page_target_list[album_id]) {
                    ep.emit('all_fin', album_img_res);
                }
            }
        });
    });
}
function all_fin(datas){
    console.log('all album fin');
    datas.forEach(function(element){
        var id = element.album_id;
        var imgs = element.imgs;
        img_list[id]= imgs;
    });
    console.log(img_list);
    var  album_num =0;
    var img_num = 0;
    Object.keys(img_list).forEach(function(element){
        album_num ++;
        img_num+=img_list[element].length;
    });
    console.log('begin to down img', ' album:', album_num,' imgs:', img_num );
    down_all();
}
function make_album_dir(dir){
    Object.keys(img_list).forEach(function(album_id){
        fs.exists(dir+'/'+album_id, function(exist){
            if(!exist){
                fs.mkdir(dir+'/'+album_id, function(err){
                    if(err) {
                        console.log('failed mkdir');
                    }
                });
            }
        });
    });
}
function down_all() {
    var dir = user_id.toString();
    fs.exists(dir, function (exist) {
        if (!exist) {
            fs.mkdir(dir, 0777, function (err) {
                if (err) {
                    console.log('failed mkdir');
                } else {
                    make_album_dir(dir);
                }
            });
        } else {
            make_album_dir();
        }
    });
    async_download();
}
function async_download() {
    var urls = [];
    Object.keys(img_list).forEach(function(album_id) {
        img_list[album_id].forEach(function (url) {
            urls.push(url);
        });
    });
    console.log(urls);
    console.log(urls.length);
    async.mapLimit(
        urls,
        5,
        function(url, callback){
            fetchUrl(url, callback);
        },
        function(err, result){
            console.log('fin down all');
        }
    )
}
var index = 0;
function fetchUrl(url, callback){
    index ++;
    download_one(url, user_id.toString()+'/'+index+'.jpg', callback);
}

function download_one(url, dir, callback){
    superagent.get(url).end(function(err, res){
        if(err){
            console.log('url:', url, 'failed');
        }else {
            fs.writeFile(dir, res.body, function (err, data) {
                if (err) {
                    console.log('writefile failed');
                }
                callback(null, '');
            });
        }

    });
}

