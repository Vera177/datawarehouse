# Data Warehouse

_Trabajo número 4 del curso de desarrollo Web Full Stack de Acámica, donde creamos el frontend y el backend de un datacenter llamado DataWarehouse._

## Comenzando 🚀

_Estas instrucciones te permitirán obtener una copia del proyecto en funcionamiento en tu máquina local._

### Pre-requisitos 📋

_Antes de comenzar a correr el proyecto, asegurate de tener instaladas las siguientes tecnologías:_

```
Node.js
MongoDB
Postman
MongoDB Compass
```

_Es opcional el uso de nvm en lugar de node.js, como también el uso de Docker para comenzar o terminar procesos como por ejemplo: mongodb_

### Instalación 🔧

_Descargamos el proyecto en nuestra máquina local._

```
git clone https://github.com/Vera177/datawarehouse.git
```

_Ahora, procedemos a instalar las dependencias necesarias:_

_Ubicados en la carpeta donde descargamos el proyecto, ejecutar:_

```
npm i
```

_Luego ejecutaremos los siguientes comandos para levantar el servidor del lado del frontend y luego del lado del backend_
En una terminal escribimos:
```
npm run dev
```
Simultáneamente abrimos otra terminal y escribimos:
```
npm run build:dev
```

Correr el cliente en el puerto 3000


_Para consultar nuestra base de datos, podemos utilizar Postman en conjunto con Swagger, donde tenemos documentados nuestros endpoints. Con nuestro proyecto levantado, nos vamos a dirigir a http://localhost:3000/api-docs/_

