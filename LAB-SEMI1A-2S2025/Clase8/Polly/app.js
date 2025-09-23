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
const polly = new AWS.Polly(aws_keys.polly);

//POST DE GENERACIÓN DE STREAM
// Endpoint para sintetizar texto a voz y enviar el audio directamente como stream
app.post('/synthesize', (req, res) => {
    let body = req.body;        // Obtiene el cuerpo del request (espera un JSON)
    let text = body.text;       // Extrae el texto que se desea convertir a voz
  
    // Parámetros para el servicio Polly de AWS
    let params = {
      OutputFormat: 'mp3',      // Formato de salida del audio
      Text: text || 'Hello there',  // Texto a convertir. Si no hay texto, usa uno por defecto
      VoiceId: 'Enrique'        // Voz utilizada (Enrique es voz en español latino masculino)
    };
    
    // Llamada al servicio de síntesis de voz
    polly.synthesizeSpeech(params, function(err, data) {
      if (err) {
        console.log(err, err.stack);      // Si hay error, lo muestra en consola
        res.send({ error: err });         // Y lo devuelve al cliente
      } else {
        console.log("Audio stream recibido");

        // Configura los encabezados de la respuesta indicando que es audio
        res.set({
          'Content-Type': 'audio/mpeg',                     // Tipo de contenido
          'Content-Length': data.AudioStream.length         // Tamaño del audio
        });

        // Envía directamente el stream de audio como respuesta
        res.send(data.AudioStream);
      }
    });
});

// POST DE GENERACIÓN DE BASE 64
app.post('/synthesize2', (req, res) => {
    let body = req.body;        // Obtiene el cuerpo del request
    let text = body.text;       // Extrae el texto a convertir
  
    // Parámetros para AWS Polly
    let params = {
      OutputFormat: 'mp3',
      Text: text || 'Hello there',
      VoiceId: 'Enrique'
    };
    
    // Llamada a Polly para convertir texto a voz
    polly.synthesizeSpeech(params, function(err, data) {
      if (err) {
        console.error('Error en Polly:', err, err.stack);   // Muestra el error si falla
        return res.status(500).json({ 
          error: 'Error al sintetizar voz',
          details: err.message
        });
      } else {
        try {
          console.log("Audio generado correctamente");

          // Convierte el buffer del audio a una cadena Base64
          const audioBase64 = data.AudioStream.toString('base64');

          // Envía una respuesta JSON con el audio en Base64 y metadatos útiles
          res.json({
            success: true,
            audioFormat: 'mp3',
            contentLength: data.AudioStream.length,   // Tamaño del audio
            audioData: audioBase64,                   // El audio codificado en Base64
            metadata: {
              voiceId: params.VoiceId,                // Voz usada
              textProcessed: params.Text.length,      // Longitud del texto procesado
              timestamp: new Date().toISOString()     // Fecha y hora del procesamiento
            }
          });

        } catch (conversionError) {
          console.error('Error en conversión Base64:', conversionError);
          res.status(500).json({ 
            error: 'Error al procesar el audio',
            details: conversionError.message
          });
        }
      }
    });
});