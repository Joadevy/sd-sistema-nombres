import express from 'express';
const app = express();
const port_server_1 = 3000; // Seria el "root"
const port_server_2 = 3001;

// Tabla de nombres (simula la gestión de un espacio de nombres)
const tablaNombresServer1 = {
    "/sistema/archivos/documentos/reporte.txt": "http://servidor-archivos/documentos/reporte.txt",
    "/procesos/12345": "http://servidor-procesos/12345"
};

// Endpoint para resolver nombres
app.get('/resolver', async (req, res) => {
    const nombre = req.query.nombre;

    if (tablaNombresServer1[nombre]) {
        res.json({ referencia: tablaNombresServer1[nombre] });
        console.log('Nombre resuelto en servidor 1')
    }
    // Si no encuentra en su tabla de nombres, intenta resolver en otro servidor
    else {
        try {
            const respuesta = await fetch(`http://localhost:3001/resolver?nombre=${nombre}`).then(res => res.json());
            res.json({ referencia: respuesta.referencia });
        } catch (error) {
            res.status(404).json({ error: "Recurso no encontrado en ningún servidor." });
        }
    }
});

app.listen(port_server_1, () => {
    console.log(`Servidor de nombres escuchando en el puerto ${port_server_1}`);
});

const tablaNombresServer2 = {
    "/servicios/desconocido": "http://servidor-servicios/desconocido"
};  

app.get('/resolver', async (req, res) => {
    const nombre = req.query.nombre;

    if (tablaNombresServer2[nombre]) {
        res.json({ referencia: tablaNombresServer2[nombre] });
        console.log('Nombre resuelto en servidor 2');
    }
    // Si no encuentra en su tabla de nombres, intenta resolver en otro servidor
    else {
        res.status(404).json({ error: "Recurso no encontrado en ningún servidor." });
    }
})

app.listen(port_server_2, () => {
    console.log(`Servidor de nombres escuchando en el puerto ${port_server_2}`);
});
    
