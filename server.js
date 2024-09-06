import express from 'express';
const port_server_1 = 3000;
const port_server_2 = 3001;
const port_server_3 = 3002;

// Tablas de nombres: simulan la gestión de un espacio de nombres para cada servidor.
const tablaNombresServer1 = {
    "ejemplo": "http://servidor/ejemplo",
    "test": "http://servidor/test",
    "ruta-simple" : "http://servidor/ruta-simple.html",
};

const tablaNombresServer2 = {
    "1": "/recurso1.txt",
    "2": "/recurso2.txt",
    "3": "/recurso3.txt",
    "4": "/subruta"
};

const tablaNombresServer3 = {
    "a": "/recursoA.txt",
    "b": "/recursoB.txt",
    "c": "/recursoC.txt"
};


const capturarSegmentosRuta = (ruta) => {
    return ruta.split("/").filter(segmento => segmento !== "");
}

// Servidor 1 (servidor "root")
const app1 = express();
app1.get('/resolver', async (req, res) => {
    const nombre = req.query.nombre;
    const segmentosRuta = capturarSegmentosRuta(nombre);
    // el segmento 1 lo resolveria en esta tabla de rutas, el segmento 2 lo delegara al servidor 2 en adelante lo delegara al segundo servidor
    const segmento1 = segmentosRuta[0];
    let direccionFinal = "";

    try {
        if (!segmento1)
            throw new Error("Ruta no válida.");
        else if (!tablaNombresServer1[segmento1])
            throw new Error("Recurso no encontrado en el servidor 1.")

        if (segmentosRuta.length == 1) {
            direccionFinal = tablaNombresServer1[segmento1];
            res.json({ referencia: direccionFinal });
            console.log(`Nombre ${nombre} resuelto a ${direccionFinal}`);
            return;
        }

        // Si la ruta tiene mas de un segmento, delegar la resolución al servidor 2
        const respuesta = await fetch(`http://localhost:${port_server_2}/resolver?nombre=${segmentosRuta.slice(1).join('/')}`);
        if (respuesta.status !== 200) 
            throw new Error("Recurso no encontrado en el servidor 2.");

        const data = await respuesta.json();
        console.log(`Nombre ${nombre} resuelto a ${tablaNombresServer1[segmento1] + data.referencia}`);
        res.json({ referencia: tablaNombresServer1[segmento1] + data.referencia });
    } catch (error) {
        res.status(404).json({ error: `Recurso nombrado ${nombre} no encontrado en ningún servidor.` });
        console.log(`Nombre ${nombre} no encontrado en ningún servidor`);
    }
});

app1.listen(port_server_1, () => {
    console.log(`Servidor de nombres 1 escuchando en el puerto ${port_server_1}`);
});

// Servidor de nombres 2
const app2 = express();
app2.get('/resolver', async (req, res) => {
    const nombre = req.query.nombre;
    const segmentosRuta = capturarSegmentosRuta(nombre);
    const segmento1 = segmentosRuta[0];

    if (!segmento1) {
        res.status(404).json({ error: "Ruta no válida." });
        return;
    }

    if (segmentosRuta.length == 1){
        if (tablaNombresServer2[segmento1]) 
            res.json({ referencia: tablaNombresServer2[segmento1] });
         else 
            res.status(404).json({ error: "Recurso no encontrado en el servidor 2." });
        return;
    }

    // Si la ruta tiene mas de un segmento, delegar la resolución al servidor 3
    try {
        const respuesta = await fetch(`http://localhost:${port_server_3}/resolver?nombre=${segmentosRuta.slice(1).join('/')}`);
        if (respuesta.status !== 200) {
            throw new Error("Recurso no encontrado en el servidor 3.");
        }

        const data = await respuesta.json();
        res.json({ referencia: tablaNombresServer2[segmento1] + data.referencia });
    } catch (error) {
        res.status(404).json({ error: "Recurso no encontrado en ningún servidor desde servidor 2" });
    }
});

app2.listen(port_server_2, () => {
    console.log(`Servidor de nombres 2 escuchando en el puerto ${port_server_2}`);
});

const app3 = express();

app3.get('/resolver', async (req, res) => {
    const nombre = req.query.nombre;
    const segmentosRuta = capturarSegmentosRuta(nombre);
    const segmento1 = segmentosRuta[0];

    if (!segmento1) {
        res.status(404).json({ error: "Ruta no válida." });
        return;
    }

    if (segmentosRuta.length == 1){
        if (tablaNombresServer3[segmento1]) 
            res.json({ referencia: tablaNombresServer3[segmento1] });
         else 
            res.status(404).json({ error: "Recurso no encontrado en el servidor 3." });
        return;
    }

    res.status(404).json({ error: "Recurso no encontrado en el servidor 3." });
})

app3.listen(port_server_3, () => {
    console.log(`Servidor de nombres 3 escuchando en el puerto ${port_server_3}`);
});  

