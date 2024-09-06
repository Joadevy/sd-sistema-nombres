![](https://res.cloudinary.com/dkjkgri6x/image/upload/v1725657917/Screenshot_2024-09-06_at_6.24.14_PM_p108r4.png)

## Objetivo de la aplicacion
Simular una conexion cliente - servidor de nombres para resolver una ruta.   

## Componentes

### Servidor de nombres 1: root
Encargado de gestionar la comunicacion con el cliente. Recibe el nombre y devuelve una ruta o 404 si no encuentra ninguna registrada bajo ese nombre. Se comunica con servidores de nombres de jerarquias menores si no encuentra en su tabla de rutas.   

### Servidor de nombres 2
Encargado de gestionar el nombre hacia una ruta registrada. No se comunica directamente con el cliente.

### Cliente
Realiza peticiones al servidor root para obtener, a partir de un nombre, la direccion del recurso.   

## Como ejecutar
Esta pensado para ejecutar directamente en la terminal usando node o el equivalente en el entorno de ejecucion de javascript de preferencia (se utilizo bun particularmente).

1. En la primera terminal, ejecuta el servidor:
   ```bash
   node server.js
   ```
2. En la segunda terminal, ejecuta un cliente interno, que sera una aplicacion que sera asignada a un grupo, y la aplicacion se conectara e su coordinado de grupo asignado. Esto puede repetirse tantas veces como aplicaciones en grupos desee tener.
    ```bash
   node client.js
   ```
