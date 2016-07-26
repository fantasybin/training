'use strict';

var view = require('../lib/view');

module.exports = function (req, res, next) {
    var originRender = res.render.bind(res);
    res.render = function (viewName, options, callback) {
        originRender(viewName, options, function (err, str) {
            if (callback) {
                return callback(err, str);
            }
            if (err) {
                return next(err);
            }
            view.render(str, viewName, function (html) {
                res.send(html);
            });
        });
    };
    next();
};
