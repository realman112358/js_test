/**
 *
 * Created by wg on 14/10/20.
 */



var express = require('express');
var util = require('util');
var utility = require('utility');
var eventproxy = require('eventproxy');
var superagent = require('superagent');
var event = require('eventproxy');
var url = require('url');
var fs = require('fs');
superagent.get('http://img03.taobaocdn.com/imgextra/i3/1062991248/TB1qhEIGpXXXXaQXFXXXXXXXXXX_!!1062991248-0-tstar.jpg').end(function(err, res){
    fs.writeFile('1.jpg', res.body, function(err, data){
        if(err){
            console.log('writefile failed');
        }
    });
});
