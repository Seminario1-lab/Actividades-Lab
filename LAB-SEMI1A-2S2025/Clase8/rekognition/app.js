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

// Instantiate AWS Rekognition service
const rek = new AWS.Rekognition(aws_keys.rekognition);

//====================================Ejemplo Rekognition===================================//

//------------------------------ Analizar Emociones Cara----------------------------//
app.post('/detectarcara', function (req, res) { 
    var imagen = req.body.imagen;
    var params = {
      Image: { 
        Bytes: Buffer.from(imagen, 'base64')
      },
      Attributes: ['ALL']
    };
    rek.detectFaces(params, function(err, data) {
      if (err) {res.json({mensaje: "Error"})} 
      else {   
             res.json({Deteccion: data});      
      }
    });
  });


  //------------------------------Analizar texto----------------------------//

  app.post('/detectartexto', function (req, res) { 
    var imagen = req.body.imagen;
    var params = {
      Image: { 
        Bytes: Buffer.from(imagen, 'base64')
      }
    };
    rek.detectText(params, function(err, data) {
      if (err) {res.json({mensaje: "Error"})} 
      else {   
             res.json({texto: data.TextDetections});      
      }
    });
  });

 //------------------------------DetectarFamoso----------------------------//

  app.post('/detectarfamoso', function (req, res) { 
    var imagen = req.body.imagen;
    var params = {
      Image: { 
        Bytes: Buffer.from(imagen, 'base64')
      }
    };
    rek.recognizeCelebrities(params, function(err, data) {
      if (err) {
        console.log(err);
        res.json({mensaje: "Error al reconocer"})} 
      else {   
             res.json({artistas: data.CelebrityFaces});      
      }
    });
  });

   //------------------------------Obtener Etiquetas----------------------------//
 
  app.post('/detectaretiquetas', function (req, res) { 
    var imagen = req.body.imagen;
    var params = {
      Image: { 
        Bytes: Buffer.from(imagen, 'base64')
      }, 
      MaxLabels: 123
    };
    rek.detectLabels(params, function(err, data) {
      if (err) {res.json({mensaje: "Error"})} 
      else {   
             res.json({texto: data.Labels});      
      }
    });
  });

//-----------------------------Comparar Fotos----------------------------//

  app.post('/compararfotos', function (req, res) { 
    var imagen1 = req.body.imagen1;
    var imagen2 = req.body.imagen2;
    var params = {
      
      SourceImage: {
          Bytes: Buffer.from(imagen1, 'base64')     
      }, 
      TargetImage: {
          Bytes: Buffer.from(imagen2, 'base64')    
      },
      SimilarityThreshold: 10
      
     
    };
    rek.compareFaces(params, function(err, data) {
      if (err) {res.json({mensaje: err})} 
      else {   
             res.json({Comparacion: data.FaceMatches});      
      }
    });
  });

