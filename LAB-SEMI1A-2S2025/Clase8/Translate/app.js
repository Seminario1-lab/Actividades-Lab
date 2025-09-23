var express = require('express');
var app = express();
const cors = require('cors');

// CORS configuration
var corsOptions = { origin: true, optionsSuccessStatus: 200 };
app.use(cors(corsOptions));

// Body parser configuration to increase the size limit to 50MB
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

var AWS = require('aws-sdk');
const aws_keys = require('./creds_template.js'); 

var port = 9000;
app.listen(port, () => console.log("Escuchando en el puerto", port));




// Se instancian todos los objetos de aws 
const translate = new AWS.Translate(aws_keys.translate); //---------> Translate

//-----------------Translate---------------------

app.post('/translate', (req, res) => {
    let body = req.body
  
    let text = body.text
  
    let params = {
      SourceLanguageCode: 'auto',
      TargetLanguageCode: 'es',
      Text: text || 'Hello there'
    };
    
    translate.translateText(params, function (err, data) {
      if (err) {
        console.log(err, err.stack);
        res.send({ error: err })
      } else {
        console.log(data);
        res.send({ message: data })
      }
    });
  });