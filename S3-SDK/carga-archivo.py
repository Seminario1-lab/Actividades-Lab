import boto3

aws_access_key_id = 'TU_ACCESS_KEY'
aws_secret_access_key = 'TU_SECRET_KEY'
region_name = 'us-east-1'

s3_client = boto3.client(
    's3',
    aws_access_key_id=aws_access_key_id,
    aws_secret_access_key=aws_secret_access_key,
    region_name=region_name
)

# Parámetros
bucket_name = 'nombre-de-tu-bucket'
file_path = 'ruta/a/la/imagen.jpg'           # Ruta local
s3_key = 'imagenes/imagen.jpg'               # Ruta en el bucket

try:
    s3_client.upload_file(file_path, bucket_name, s3_key)
    print(f"Imagen subida exitosamente a s3://{bucket_name}/{s3_key}")
except Exception as e:
    print("Error al subir la imagen:", e)
