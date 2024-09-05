async function resolverNombre(nombre) {
    try {
        const respuesta = await fetch(`http://localhost:3000/resolver?nombre=${nombre}`).then(res => res.json())
        console.log(`Recurso encontrado: ${respuesta.referencia}`);
        return respuesta.referencia;
    } catch (error) {
        console.error(`Error al resolver nombre: ${error.response ? error.response.data.error : error.message}`);
    }
}

// Ejemplos de resolución de nombres
resolverNombre("/sistema/archivos/documentos/reporte.txt");
resolverNombre("/procesos/12345");
resolverNombre("/servicios/desconocido");
