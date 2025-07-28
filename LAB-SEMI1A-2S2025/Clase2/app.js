const express = require('express');
const app = express();

const PORT = 3000;



app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Servidor en Ejecución</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f0f0f0;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    margin: 0;
                }
                h1 {
                    color: #333;
                    background-color: #fff;
                    padding: 20px;
                    border-radius: 10px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }
                     button {
                    margin: 10px;
                    padding: 10px;
                    font-size: 16px;
                    cursor: pointer;
                }
            </style>
        </head>
        <body>
            <h1>¡Servidor ejecutándose correctamente!</h1>
            <button onclick="location.href='/curso'">Ir a Curso</button>
        </body>
        </html>
    `);
});


//Ejemplo Uno
app.get('/curso', (req, res) => {
    res.send(`
        <html>
        <head>
            <style>
                body { text-align: center; font-family: Arial, sans-serif; }
                button { margin: 10px; padding: 10px; font-size: 16px; cursor: pointer; }
            </style>
        </head>
        <body>
            <h1 style="color: blue;">Seminario De Sistemas 1 A</h1>
            <button onclick="location.href='/animes'">Ir a Animes</button>
        </body>
        </html>
    `);
});

// Ejemplo 2
app.get('/animes', (req, res) => {
    const animes = ['Demon Slayer', 'Solo Leveling', 'Attack on Titan', 'Jujutsu Kaisen', 'Dragon Ball'];
    let html = `
        <html>
        <head>
            <style>
                body {
                    background-color: #f4f4f4;
                    font-family: Arial, sans-serif;
                    text-align: center;
                }
                table {
                    width: 50%;
                    margin: auto;
                    border-collapse: collapse;
                    background-color: white;
                    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
                }
                th, td {
                    padding: 10px;
                    border: 1px solid #ddd;
                }
                th {
                    background-color: green;
                    color: white;
                }
                button {
                    margin: 10px;
                    padding: 10px;
                    font-size: 16px;
                    cursor: pointer;
                }
            </style>
        </head>
        <body>
            <h1 style="color: green;">Lista de Animes</h1>
            <table>
                <tr><th>Nombre del Anime</th></tr>`;
    animes.forEach(anime => {
        html += `<tr><td>${anime}</td></tr>`;
    });
    html += `</table>
            <button onclick="location.href='/curso'">Ir a Curso</button>
        </body>
        </html>`;
    res.send(html);
});




app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});