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
resolverNombre("/ruta-simple");
resolverNombre("/ejemplo/1");
resolverNombre("/test/2");
resolverNombre("/ejemplo/4/a");
resolverNombre("/test/4/b");

// Ejemplos de resoluciones no exitosas
resolverNombre("/servidor-desconocido");
resolverNombre("/ejemplo/not-found");
resolverNombre("/test/4/not-found");
