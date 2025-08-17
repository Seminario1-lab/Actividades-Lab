import json
import base64
import boto3
import os

# Configura el cliente S3
s3 = boto3.client('s3')

def lambda_handler(event, context):

    # Definir el nombre del bucket
    bucket_name = 'clase5lambda'

    try:
        # Verificar si el cuerpo del evento es una cadena y convertirlo en un diccionario
        if isinstance(event.get('body'), str):
            event = json.loads(event['body'])

        # Extraer el nombre de la imagen y la imagen en base64 del evento
        image_name = event.get('name')  # Nombre de la imagen
        image_base64 = event.get('image')  # Imagen en base64

        if not image_name or not image_base64:
            raise ValueError("Faltan parámetros necesarios: 'name' o 'image'")

        # Decodificar la imagen de base64 a bytes
        image_data = base64.b64decode(image_base64)
        
        # Subir la imagen al bucket S3
        s3.put_object(
            Bucket=bucket_name,
            Key=image_name,
            Body=image_data,
            ContentType='image/jpeg'  # Cambia este tipo según el formato de tu imagen
        )

        image_url = f"https://{bucket_name}.s3.amazonaws.com/{image_name}"

        # Respuesta exitosa
        response = {
            "statusCode": 200,
            "body": json.dumps({
                "message": "Imagen subida exitosamente",
                "imageUrl": image_url
            })
        }
        return response

    except Exception as e:
        # Respuesta en caso de error
        response = {
            "statusCode": 500,
            "body": json.dumps({
                "message": "Ocurrió un error al subir la imagen",
                "error": str(e)
            })
        }
        return response
