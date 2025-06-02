import requests

subscription_key = "TU_CLAVE"
endpoint = "https://TU_ENDPOINT.cognitiveservices.azure.com/face/v1.0/detect"

image_url = "" #ruta o url de la imagen a analizar

headers = {
    'Ocp-Apim-Subscription-Key': subscription_key,
    'Content-Type': 'application/json'
}

params = {
    'returnFaceAttributes': 'emotion'
}

data = {
    'url': image_url
}

response = requests.post(endpoint, params=params, headers=headers, json=data)
print(response.json())
