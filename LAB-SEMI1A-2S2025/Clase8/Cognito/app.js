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

// Este módulo permite autenticar, registrar y manejar usuarios en un User Pool de Cognito.
const AmazonCognitoIdentity = require('amazon-cognito-identity-js'); 
// Crea una instancia del User Pool de Cognito usando las credenciales definidas en aws_keys.
const cognito = new AmazonCognitoIdentity.CognitoUserPool(aws_keys.cognito); 

//-------------------------Amazon Cognito---------------------

// Ruta para iniciar sesión
app.post("/api/login", async (req, res) => {

  // Crear los detalles de autenticación usando el email como nombre de usuario
  const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
    Username: req.body.email,              
    Password: req.body.password            
  });

  // Datos del usuario para Cognito
  const userData = {
    Username: req.body.email,              // Email como identificador
    Pool: cognito,                         
  };

  // Crear el objeto de usuario Cognito
  const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
  cognitoUser.setAuthenticationFlowType('USER_PASSWORD_AUTH'); // Tipo de flujo de autenticación

  // Autenticar al usuario
  cognitoUser.authenticateUser(authenticationDetails, {
    onSuccess: function (result) {
      // Si es exitoso, enviar mensaje de éxito
      res.json({
        mensaje: "Inicio de sesión exitoso.",
      });
    },
    onFailure: function (err) {
      // Si falla (credenciales incorrectas, usuario no confirmado, etc.)
      res.status(401).json({
        success: false,
        message: "No se pudo iniciar sesión. Verifica tus credenciales o confirma tu cuenta."
      });
    },
  });
});


// Ruta para registrar un nuevo usuario
app.post("/api/signup", async (req, res) => {

  const attributelist = []; // Lista de atributos del nuevo usuario

  // Atributo estándar: nombre del usuario
  const dataname = {
    Name: 'name',
    Value: req.body.name,
  };
  attributelist.push(new AmazonCognitoIdentity.CognitoUserAttribute(dataname));

  // Atributo estándar: email
  const dataemail = {
    Name: 'email',
    Value: req.body.email,
  };
  attributelist.push(new AmazonCognitoIdentity.CognitoUserAttribute(dataemail));

  // Atributo personalizado: carnet (debe estar definido como custom:carnet en Cognito)
  const datacarnet = {
    Name: 'custom:carnet',
    Value: req.body.carnet + "", // Convertido a string por si es número
  };
  attributelist.push(new AmazonCognitoIdentity.CognitoUserAttribute(datacarnet));

  // Registrar el usuario en Cognito 
  cognito.signUp(
    req.body.email,                     // Email usado como identificador
    req.body.password,                  
    attributelist,                      // Atributos definidos
    null,                               // Parámetros opcionales adicionales
    async (err, data) => {
      if (err) {
        // Si ocurre un error (email duplicado, mal formato, etc.)
        console.log(err);
        return res.status(400).json({ error: err.message || err });
      }

      // Registro exitoso
      console.log(data);
      res.json(`${req.body.email} registrado correctamente.`);
    }
  );
});
