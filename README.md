# Firebase login con Nuxt.js

Un pequeño tutorial de como hacer un sistema de autenticación con [NUXT](https://nuxtjs.org/) y [FIREBASE](https://firebase.google.com/):

## Necesario:

1. Una cuenta de google para poder acceder a la consola de FIREBASE.
2. Crear un proyecto nuevo de FIREBASE y agregar usuarios a la base de datos de autenticación.

### Como crear un proyecto en FIREBASE

1. Accedemos a [FIREBASE](https://firebase.google.com/) y procedemos a hacer login, acreditamos nuestras credenciales y procedemos a ir a la consola de adminitración

![alt text](https://raw.githubusercontent.com/chadsfatherlali/nuxt-async-data-firebase/master/assets/acceder.png "Botón Acceder")

2. Creamos un nuevo proyecto, le asignamos un nombre y escogemos el país ó región que más nos convenga

![alt text](https://raw.githubusercontent.com/chadsfatherlali/nuxt-async-data-firebase/master/assets/crearproyecto1.png "Botón Crear proyecto")

![alt text](https://raw.githubusercontent.com/chadsfatherlali/nuxt-async-data-firebase/master/assets/crearproyecto2.png "Botón Modal crear proyecto")

3. Dentro de la consola escogemos la pestaña **DEVELOP -> Authentication**, nos pedira que configuremos nuestro método de acceso, para nuestra demo seleccionamos **Correo electrónico/contraseña** habilitamos y guardamos el proveedor de acceso

![alt text](https://raw.githubusercontent.com/chadsfatherlali/nuxt-async-data-firebase/master/assets/autenticacion1.png "Panel de autenticación")

![alt text](https://raw.githubusercontent.com/chadsfatherlali/nuxt-async-data-firebase/master/assets/autenticacion2.png "Panel de autenticación")
