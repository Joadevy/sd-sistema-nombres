async function resolverNombre(nombre) {
    try {
        const request = await fetch(`http://localhost:3000/resolver?nombre=${nombre}`);
        const respuesta = await request.json();

        // Verificar si pudo resolver el nombre
        if (request.status === 200) {
            console.log(`Recurso encontrado: ${respuesta.referencia}`);
            return;
        } else {
            console.log(`Error ${request.status}: ${respuesta.error}`);
        }

    } catch (error) {
        console.error(`Error al resolver nombre: ${error.message}`);
    }
}

// Ejemplos de resolución de nombres
resolverNombre("/sistema/archivos/documentos/reporte.txt");
resolverNombre("/procesos/12345");
resolverNombre("/servicios/desconocido");
resolverNombre("/ejemplo-no-encontrado");
