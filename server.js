import express from 'express';
const app = express();
const port = 3000;

// Tabla de nombres (simula la gestión de un espacio de nombres)
let tablaNombresLocal = {
    "/sistema/archivos/documentos/reporte.txt": "http://servidor-archivos/documentos/reporte.txt",
    "/procesos/12345": "http://servidor-procesos/12345"
};

// Endpoint para resolver nombres
app.get('/resolver', async (req, res) => {
    const nombre = req.query.nombre;

    if (tablaNombresLocal[nombre]) {
        res.json({ referencia: tablaNombresLocal[nombre] });
    }
    // Si no encuentra en su tabla de nombres, intenta resolver en otro servidor
    else {
        try {
            const respuesta = await fetch(`http://otro-servidor-nombres:3000/resolver?nombre=${nombre}`).then(res => res.json());
            res.json({ referencia: respuesta.referencia });
        } catch (error) {
            res.status(404).json({ error: "Recurso no encontrado en ningún servidor." });
        }
    }
});

app.listen(port, () => {
    console.log(`Servidor de nombres escuchando en el puerto ${port}`);
});
