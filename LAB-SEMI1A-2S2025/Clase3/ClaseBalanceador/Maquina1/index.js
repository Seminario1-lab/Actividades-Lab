var express = require('express');
var app = express();
var fs = require("fs");

app.get('/listUsers', function (req, res) {
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
      console.log( data );
      res.end( data );
   });
})

app.get('/', (req, res) => {
   res.status(200).send('OK');
 });

var server = app.listen(7000, function () {
   var host = server.address().address
   var port = server.address().port
   console.log(`Se está ejecutando en el puerto: http://${host}:${port}`);

})