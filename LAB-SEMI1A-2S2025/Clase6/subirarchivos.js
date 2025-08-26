const { Buffer } = require("buffer");

module.exports = async function (context, req) {
    try {
        let { nombre, imagen } = req.body;

        if (!nombre || !imagen) {
            context.res = { status: 400, body: "Faltan datos requeridos." };
            return;
        }

        // Convertir Base64 a Buffer
        const buffer = Buffer.from(imagen, "base64");

        // Guardar en Azure Blob Storage
        context.bindings.outputBlob = buffer;

        // URL del archivo en Blob Storage
        const storageAccountName = "ejemploclase7";
        const containerName = "archivos";
        const fileUrl = `https://${storageAccountName}.blob.core.windows.net/${containerName}/${nombre}`;


        context.res = {
            status: 200,
            body: { message: "Archivo guardado con éxito", fileUrl }
        };

    } catch (error) {
        context.log(error.message);
        context.res = { status: 500, body: error.message };
    }
};
