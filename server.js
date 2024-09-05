import express from 'express';
const app = express();
const port = 3000;

// Tabla de nombres (simula la gestión de un espacio de nombres)
let tablaNombres = {
    "/sistema/archivos/documentos/reporte.txt": "http://servidor-archivos/documentos/reporte.txt",
    "/procesos/12345": "http://servidor-procesos/12345"
};

// Endpoint para resolver nombres
app.get('/resolver', (req, res) => {
    const nombre = req.query.nombre;

    if (tablaNombres[nombre]) {
        res.json({ referencia: tablaNombres[nombre] });
    } else {
        // Simulamos reenviar la solicitud a otro servidor
        // En una implementación completa, aquí se consultaría a otro servidor DNR
        res.status(404).json({ error: "Recurso no encontrado en este servidor." });
    }
});

// Endpoint para registrar nuevos nombres
app.post('/registrar', (req, res) => {
    const { nombre, referencia } = req.body;

    if (tablaNombres[nombre]) {
        return res.status(400).json({ error: "Nombre ya registrado." });
    }
    
    tablaNombres[nombre] = referencia;
    res.json({ message: "Recurso registrado exitosamente." });
});

app.listen(port, () => {
    console.log(`Servidor de nombres escuchando en el puerto ${port}`);
});
