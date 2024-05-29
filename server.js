const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware para parsear el body de las solicitudes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Ruta para servir el archivo HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'prueba.html'));
});

// Ruta para manejar la solicitud de guardar datos
app.post('/guardar-datos', (req, res) => {
    const datos = req.body;

    // Leer el archivo JSON existente
    const filePath = path.join(__dirname, 'Alquiler.json');
    let listaDatos = [];

    if (fs.existsSync(filePath)) {
        const jsonData = fs.readFileSync(filePath, 'utf8');
        listaDatos = JSON.parse(jsonData);
    }

    // Agregar los nuevos datos a la lista
    listaDatos.push(datos);

    // Guardar los datos actualizados en el archivo JSON
    fs.writeFileSync(filePath, JSON.stringify(listaDatos, null, 2), 'utf8');

    res.status(200).send('Datos guardados exitosamente.');
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
