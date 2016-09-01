var express = require('express');
var index = require('./routes/index');
var app = express();

app.use('/index', index);

app.use(function(req, res, next) {
  res.status(404).send('Sorry cant find that!');
});

var server = app.listen(3000, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});