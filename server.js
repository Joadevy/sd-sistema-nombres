import express from 'express';
const port_server_1 = 3000;
const port_server_2 = 3001;

// Tablas de nombres: simulan la gestión de un espacio de nombres para cada servidor.
const tablaNombresServer1 = {
    "/sistema/archivos/documentos/reporte.txt": "http://servidor-archivos/documentos/reporte.txt",
    "/procesos/12345": "http://servidor-procesos/12345"
};

const tablaNombresServer2 = {
    "/servicios/desconocido": "http://servidor-servicios/desconocido"
};

// Servidor 1 (servidor "root")
const app1 = express();
app1.get('/resolver', async (req, res) => {
    const nombre = req.query.nombre;

    if (tablaNombresServer1[nombre]) {
        res.json({ referencia: tablaNombresServer1[nombre] });
        console.log(`Nombre ${nombre} resuelto en servidor 1`);
    }
    // Si no encuentra en su tabla de nombres, intenta resolver en el servidor 2
    else {
        try {
            const respuesta = await fetch(`http://localhost:${port_server_2}/resolver?nombre=${nombre}`);
            
            if (respuesta.status !== 200) {
                throw new Error("Recurso no encontrado en el servidor 2.");
            }

            const data = await respuesta.json();
            res.json({ referencia: data.referencia });
        } catch (error) {
            res.status(404).json({ error: "Recurso no encontrado en ningún servidor." });
            console.log(`Nombre ${nombre} no encontrado en ningún servidor`);
        }
    }
});

app1.listen(port_server_1, () => {
    console.log(`Servidor de nombres 1 escuchando en el puerto ${port_server_1}`);
});

// Servidor de nombres 2
const app2 = express();
app2.get('/resolver', (req, res) => {
    const nombre = req.query.nombre;

    if (tablaNombresServer2[nombre]) {
        res.json({ referencia: tablaNombresServer2[nombre] });
        console.log(`Nombre ${nombre} resuelto en servidor 2`);
    } else {
        res.status(404).json({ error: "Recurso no encontrado en el servidor 2." });
    }
});

app2.listen(port_server_2, () => {
    console.log(`Servidor de nombres 2 escuchando en el puerto ${port_server_2}`);
});
