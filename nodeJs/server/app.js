/**
 * UCAR WAP OPEN Platform Module Dependencies.
 * UCAR Information Systems.
 * author: marion - jg.liu@zuche.com-2605
 * date: 16-05-28
 * version: 0.1
 */
'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var http = require('http');
var log4js = require('../config/logger');
var log = log4js.getLogger('app');
// autoroute
var autoroute = require('express-autoroute');
// session
var session = require('express-session');
// redis
var RedisStore = require('connect-redis')(session);
// cookie
var cookieParser = require('cookie-parser');
// environment setting
var config = require('config');
// template engine
var hbs = require('./lib/hbs');
var interceptor = require('./middlewares/interceptor');
var errorHandle = require('./middlewares/error-handle');
var env = process.env.NODE_ENV;
var app = express();

// cookie
app.use(cookieParser('keyboard'));

// session
app.use(session({
    store: new RedisStore(config.redisOption),
    resave: false,
    saveUninitialized: true,
    secret: 'express is powerful',
    cookie: {
        maxAge: 10000000
    }
}));

// interceptor
interceptor(app, {
    checkPath: ['/*'],
    render: true
});

// static files
if (config.resource.bundle) {
    app.use(express.static(config.path.staticDir));
} else {
    app.use(express.static(config.path.clientDir));
}

app.set('env', env);
app.set('port', config.port);

if (env === 'development') {
    app.use(logger('dev'));
    // redirect localhost
    app.use(function (req, res, next) {
        if (req.hostname === 'localhost' || req.hostname === '127.0.0.1') {
            return res.redirect(config.baseUrl.baseUrl);
        }
        next();
    });
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

// route
autoroute(app, {
    routesDir: config.path.root + '/server/routes',
    logger: log4js.getLogger('autoroute'),
});

// view locals
app.locals.baseUrl = config.baseUrl;
app.locals.resource = config.resource;
// view setting
app.engine('.hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', config.path.viewsDir);

// error handle
errorHandle(app, {
    env: env,
    test: 'test'
});

/**
 * Listen on provided port, on all network interfaces.
 */
var server = http.createServer(app);
server.on('error', function (err) {
    log.error('server error', err);
});
server.on('listening', function () {
    log.info('server starts on %j', server.address());
});
server.listen(config.port);

process.on('uncaughtException', function (err) {
    log.error('uncaught exception', err);
});

module.exports = app;
