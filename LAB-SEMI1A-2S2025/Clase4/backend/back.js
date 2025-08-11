const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Configuración de Cors
const cors = require('cors');
var corsOptions = {origin:true, optionSuccessStatus: 200};
app.use(cors(corsOptions))

// Configuración para body
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded());

app.use(bodyParser.json({limit: "100mb"}));
app.use(bodyParser.urlencoded({limit:"100mb",extend:true}));

const port = 9000

///////////////////////cliente////////////////////
// Se hace un require de SDK
var AWS = require('aws-sdk');
// Se importan las credenciales
const aws_keys = require('./creds_template.js')
// Se accede al servicio
const s3 = new AWS.S3(aws_keys.s3)
//////////////////////////////////////////

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/subir_imagen', function (req,res){
  //Id de la Imagen
  var id = req.body.id;
  //Imagen en base 64
  var foto = req.body.foto;

  //directorio que tendrá la imagen en S3
  var nombreis3 = "Imagenes/" + id + ".jpg";

  //Conversión de Base64 a bytes
  let buff = new Buffer.from(foto, 'base64');

  // Parametros para la carga de la imagen
  const params = {
    Bucket: "clase4ejemplo",
    Key: nombreis3,
    Body: buff,
    ContentType: "image"
  };
  const putResult = s3.putObject(params).promise();
  res.json({mensaje: putResult})
})

app.post('/subir_pdf', (req,res) =>{
  
   //Id del pdf
   var id_pdf = req.body.id;
   //Pdf en base 64
   var archivo_pdf = req.body.pdf;
 
   //directorio que tendrá el pdf en S3
   var nombrepdfs3 = "pdfs/" + id_pdf + ".pdf";

   //Conversión de Base64 a bytes
  let buff = new Buffer.from(archivo_pdf, 'base64');

  // Parametros para la carga del pdf
  const params = {
    Bucket: "clase4ejemplo",
    Key: nombrepdfs3,
    Body: buff,
    ContentType: "application/pdf"
  };
  const putResult = s3.putObject(params).promise();
  res.json({mensaje: putResult})
})


app.get('/obtener_imagen',(req,res)=>{
  var id = req.body.id;
  var nombrei = "Imagenes/"+id+".jpg";
  var getParams = {
    Bucket: "clase4ejemplo",
    Key: nombrei
  }

  s3.getObject(getParams, function(err,data){
    if(err){
      res.json(err)
    }else{
      var dataBase64 = Buffer.from(data.Body).toString('base64') //reconversión de bytes a base 64
      res.json({mensaje:dataBase64})
    }
  })
})

app.get('/obtener_pdf',(req,res)=>{
  var id = req.body.id;
  var nombrepdf = "pdfs/"+id+".pdf";
  var getParams = {
    Bucket: "clase4ejemplo",
    Key: nombrepdf
  }

  s3.getObject(getParams, function(err,data){
    if(err){
      res.json(err)
    }else{
      var dataBase64 = Buffer.from(data.Body).toString('base64') //reconversión de bytes a base 64
      res.json({mensaje:dataBase64})
    }
  })
})

app.listen(port, () => {
  console.log(`Backend escuchando en el puerto ${port}`)
})