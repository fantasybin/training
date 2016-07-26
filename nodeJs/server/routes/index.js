'use strict';

var path = require('path');
var fs = require('fs');
var config = require('config');

// routes
exports.autoroute = {
    'all': {
        '/': indexController,
        '/index': redirectToIndex,
        '/healthCheck.html': healthCheckController,
        '/non-healthCheck.html': nonHealthCheckController,
    },
};

// controllers
function indexController(req, res) {
    var data = [
        { title : '立即叫车', lang : 'immediate', id : 14 },
        { title : '预约用车', lang : 'prebook', id : 13 },
        { title : '日租', lang : 'day', id : 12 },
        { title : '半日租', lang : 'halfday', id : 11 },
        { title : '接机', lang : 'receive', id : 7 },
        { title : '送机', lang : 'send', id : 8 },
    ];
    res.render('index/index', {
        navList : data
    });
}

function redirectToIndex(req, res) {
    res.redirect('/');
}

function healthCheckController(req, res) {
    res.send(fs.readFileSync(
        path.resolve(config.path.root, 'public/healthCheck.html'),
        { encoding: 'utf8' }
    ));
}

function nonHealthCheckController(req, res) {
    res.send(fs.readFileSync(
        path.resolve(config.path.root, 'public/non-healthCheck.html'),
        { encoding: 'utf8' }
    ));
}
