![](https://res.cloudinary.com/dkjkgri6x/image/upload/v1725664692/Screenshot_2024-09-06_at_8.17.41_PM_zudb40.png)

## Objetivo de la aplicacion
Simular una conexion cliente - servidor de nombres para resolver una ruta jerarquica en forma recursiva.  

## Componentes

### Servidor de nombres 1 (root)
Encargado de gestionar la comunicacion con el cliente. Recibe el nombre y devuelve una ruta al recurso solicitado o 404 si no encuentra ninguna registrada bajo ese nombre en ninguno de los servidores disponibles. Se comunica con servidores de nombres de jerarquias menores si no encuentra en su tabla de rutas.   

### Servidor de nombres 2
Encargado de direccionar el nombre hacia una ruta registrada. Se comunica con servidores de nombres de jerarquias menores si no encuentra en su tabla de rutas. No se comunica directamente con el cliente.

### Servidor de nombres 3
Encargado de direccionar el nombre hacia una ruta registrada. Es el ultimo servidor en la jerarquia. No se comunica directamente con el cliente.

### Cliente
Realiza peticiones al servidor root para obtener, a partir de un nombre, la direccion de un recurso.   

## Como ejecutar
Esta pensado para ejecutar directamente en la terminal usando node o el equivalente en el entorno de ejecucion de javascript de preferencia (se utilizo bun particularmente).

1. En la primera terminal, ejecuta el servidor:
   ```bash
   node server.js
   ```
2. En la segunda terminal, ejecuta el cliente, que realizara varias peticiones de ejemplo, con nombres a recursos que estan registrados en los servidores, y algunos que no lo estan.
    ```bash
   node client.js
   ```
Finalmente, se pueden ver tanto en el cliente las rutas obtenidas como en el servidor las redirecciones resueltas.
