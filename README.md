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

![alt text](https://raw.githubusercontent.com/chadsfatherlali/nuxt-async-data-firebase/master/assets/autenticacion3.png "Panel de autenticación")

3. Agregamos un suario dando de alta su correo y contraseña

![alt text](https://raw.githubusercontent.com/chadsfatherlali/nuxt-async-data-firebase/master/assets/altausuario1.png "Panel de alta a usuarios")

## En este punto tenemos todo listo para pasar al código, usar como referencia este [repositorio](https://github.com/chadsfatherlali/nuxt-async-data-firebase) como esqueleto de la aplicación, estructura de directorios etc.

1. Vamos a configurar nuestro fichero **package.json** con los necesario para hacer funcionar nuestra aplicación, para lo cual nos quedara algo similar a esto, **(se puede obviar firebase-admin puesto que podemos acceder a los datos de firebase por rest api, para más referencias consultar [aquí](https://firebase.google.com/docs/reference/rest/database/))**

```javascript
{
  "name": "nuxt-async-data",
  "dependencies": {
    "body-parser": "latest",
    "express": "latest",
    "express-session": "latest",
    "axios": "latest",
    "child_process": "^1.0.2",
    "firebase": "^4.10.0",
    "firebase-admin": "latest",
    "fs": "0.0.1-security",
    "net": "^1.0.2",
    "nuxt": "latest",
    "tls": "0.0.1"
  },
  "scripts": {
    "dev": "nuxt",
    "build": "nuxt build",
    "start": "nuxt start"
  }
}
```
2. Añadimos los necesario en nuestro archivo de configuración de NUXT **nuxt.config.js** y haciendo uso de un Server middleware para comunicarnos en nuestro caso con un servidor express, el cual nos va a ayudar a guardar al session del usuario a traves de las páginas para saber que estamos logados, para más referencias [aquí](https://nuxtjs.org/api/configuration-servermiddleware#the-servermiddleware-property)

```javascript
const bodyParser = require('body-parser');
const session = require('express-session');

module.exports = {
  build: {
    vendor: ['axios']
  },
  loading: {
    color: '#4FC08D',
    failedColor: '#bf5050',
    duration: 1500
  },
  head: {
    title: 'Default title'
  },
  generate: {
    routes: [
      '/posts/1'
    ]
  },
  serverMiddleware: [
    bodyParser.json(),
    session({
      secret: 'super-secret-key',
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: null }
    }),
    '~/api'
  ]
} 
```
3. Preparamos nuestro servidor **express** creando el fichero **/api/index.js** cual su punto de montaje va a ser bajo la ruta **/api** el cual hemos definido en el paso anterior en nuestro serverMiddleware

```javascript
const express = require('express')
const router = express.Router()
const app = express()

router.use((req, res, next) => {
  Object.setPrototypeOf(req, app.request)
  Object.setPrototypeOf(res, app.response)
  req.res = res
  res.req = req
  next()
})

// Ruta post a la que llamaremos desde el frontal para poder guardar la session del usuario lo
router.post('/setSession', (req, res) => {
  req.session.authUser = req.body  

  res.json ({ ok: true })
  //res.status(401).json({ message: 'Bad credentials' })
})

// Ruta post a la llamaremos desde el frontal para poder destruir la session del usuario y por tanto deslogarnos
router.post('/destroySession', (req, res) => {
  delete req.session.authUser

  res.json({ ok: true })
})

module.exports = {
  path: '/api',
  handler: router
}
```
4. Ahora ponemos en marcha nuestro **[store](https://nuxtjs.org/examples/auth-routes#using-the-store)** creamos el fichero **/store/index.js** el cual nos va a servir para centralizar todos los etados del proceso del login, en cada una de las acciones declaradas de nuestro estore hacemos una llamada asyncrona a nuestras rutas del api tanto para hacer **login** y **logout**, teniendo muy en cuenta de la acción **nuxtServerInit** la cual nos permite hacer de puente entre nuestro frontal y el backend, esta función se llama en cada petición a nuestra aplicación en **NUXT**, en esta preguntamos por la session del usuario para poder arrastrarla por toda la aplicación 

```javascript
import { currentUser } from '../plugins/firebase/firebase-client.js'
import axios from 'axios'

export const state = () => ({
	authUser: null
});

export const mutations = {
	SET_USER: function (state, user) {
		state.authUser = user
	}
}

export const actions = {
  // Función que se ejecuta al inicio de cada petición a nuestra aplicación
	nuxtServerInit({ commit }, { req }) {
		if (
			req.session 
			&& req.session.authUser
			&& req.session.authUser.user
		) {
			commit('SET_USER', req.session.authUser.user)			
		}
	},
  // Definimos la acción login a la cual llamaremos desde nuestra página de login
	async login ({ commit }, { user }) {
		const { sessionStatus } = await axios.post('/api/setSession', { user })
		commit('SET_USER', user)
	},
  // Definos la acción logout a la cual se le va llamar desde nuestro boton de logout
	async logout ({ commit }) {
		const { sessionStatus } = await axios.post('/api/destroySession')
		commit('SET_USER', null)
	}
}
```

5. Hora de crear nuestro middleware para manejar el estado del usuario y poder denegar ó no el acceso a las páginas de nuestra aplicación, para esto creamos el fichero **/middleware/auth.js** en el caso de que el estado definido por nuestro **store** se null redirigimos al usuario hacia la página de login

```javascript
export default function ({ store, error, redirect }) {
	if (!store.state.authUser) {
		return redirect('/users/login')
	}
}
```
6. Vamos a crear nuestro pequeño plugin que nos va a servir de puente para hacer un login contra **FIREBASE** creamos el fichero **/plugins/firebase/firebase-client.js** en este fichero vamos a crear la instancia hacia **FIREBASE** y unos metodos que nos van a servir para poder hacer el login y obtener el usuario logado, para necesitaremo el **apiKey** para poder crear una instancia a firebase, la **apiKey** la podemos obtener en nuestra consola de firebase dando click en el botón de **configuración web** el cual nos muestra un pequeña chuleta de como confiurar nuestra app con nuestras credenciales

[!alt text](https://raw.githubusercontent.com/chadsfatherlali/nuxt-async-data-firebase/master/assets/apikey.png "api key")

```javascript
import * as firebasedb from 'firebase';

if (!firebasedb.apps.length) {
    firebasedb.initializeApp({
		apiKey: 'abcdefghijklmnopqrstuvwxy',
		databaseURL: 'https://test-3c452.firebaseio.com/',
	});
}

/**
 * Obtenemos el usuario actualmente logado
 */
const currentUser = () => {
	return firebasedb.auth().currentUser;
}

/**
 * Hacemos un login contra firebase
 */
const login = async (email, password) => {
	let loginStatus = await firebasedb.auth().signInWithEmailAndPassword(email, password).catch(err => {
		return err;
	});

	return loginStatus;
}

/**
 * Hacemos un logout contra firebase
 */
const logout = async () => {
	let logoutStatus = await firebasedb.auth().signOut().catch(err => {
		return err
	})

	return logoutStatus
}

/**
 * Función para hacer consultas a una coleccion
 */
const consult = async (collection) => {
	let snapshot = await firebasedb.database().ref(collection).once('value');

	return snapshot.val();
}

export { firebasedb, consult, login, currentUser };
```

7. Hora de pasar a crear nuestras páginas de login y nuestra página protegida por la session a la cual solo tendra acceso un usuario **logado** creamos nuestro fichero bajo [/pages/users/login.vue](https://github.com/chadsfatherlali/nuxt-async-data-firebase/blob/master/pages/users/login.vue) en este ficher dentro de los métodos **methods** a los que podemos llamar desde nuestro component en cada una de sus accioens podemos ver que hacemos un **dispatch** hacia las acciones definidas previamente en nuestro fichero de **[store](https://github.com/chadsfatherlali/nuxt-async-data-firebase/blob/master/store/index.js)** en el método de login podemos ver que como argumento pasamos **cuurentUser()** método definido en nuestro plugin creado anteriormente **[plugin FIREBASE](https://github.com/chadsfatherlali/nuxt-async-data-firebase/blob/master/plugins/firebase/firebase-client.js)** el cual nos devuelve el usuario actualmente logado por por el método login y también existe el método logout que hace logout contra **FIREBASE** que llama a la acción de nuestro **store** que setea a null la session del usuario

```javascript
import { login, logout, currentUser } from '../../plugins/firebase/firebase-client.js';
export default {
  data () {
    return {
      formEmail: '',
      formPassword: ''
    }
  },
  methods: {
    async login () {
      try {
        await login(this.formEmail, this.formPassword);
        await this.$store.dispatch('login', {
          user: currentUser()
        });
      }
      catch (e) {
        console.log(e)
      }
    },
    async logout () {
      try {
        await logout()
        await this.$store.dispatch('logout')
      }
      catch (e) {
        console.log(e)
      }
    }
  },
  head: {
    title: 'Login users'
  }
}
```
8. Creamos un página protegida a la cual solo va a poder acceder un usuario logado para esto creamos nuestro fichero bajo [/pages/users/index.vue](https://github.com/chadsfatherlali/nuxt-async-data-firebase/blob/master/pages/users/index.vue) la cual va a hacer uso de nuetro middleware [/middleware/auth.js](https://github.com/chadsfatherlali/nuxt-async-data-firebase/blob/master/middleware/auth.js) creado anteriormente para seteamos la propiedad **middleware** en el javascript de nuestro componente

```javascript
import axios from 'axios'
import { urlDatabase } from '../../plugins/firebase/firebase-const'
export default {
  asyncData({ req, params }) {
  	return axios.get(urlDatabase + 'personas.json')
      .then(response => {
        return {
          users: response.data
        }
      })
      .catch(err => {
        console.log(err)
      })
  },
  head: {
    title: 'List of posts'
  },
  middleware: 'auth'
}
```

9. Ahora ya estamos listos para poner en marcha nuestra aplicación creada en **NUXT**, haciendo uso del comando **npm run dev** para mas referencias [aqui](https://nuxtjs.org/guide/commands/) y abriendo nuestro navegador en [localhost:3000/users](http://localhost:3000/users) veremos que somos inmediatamente redirigidos a la página de login [localhost:3000/users/login](http://localhost:3000/users/login)

![alt text](https://raw.githubusercontent.com/chadsfatherlali/nuxt-async-data-firebase/master/assets/login1.png "login 1")

10. En nuestra página de login podemos hacer uso de nuestro usuario dado de alta en firebase y veremos como cambia el estado de la página a logado y por tanto poder visitar la protegida por nuestro middleware [localhost:3000/users](http://localhost:3000/users)

![alt text](https://raw.githubusercontent.com/chadsfatherlali/nuxt-async-data-firebase/master/assets/login2.png "login 2")
![alt text](https://raw.githubusercontent.com/chadsfatherlali/nuxt-async-data-firebase/master/assets/login3.png "login 3")
![alt text](https://raw.githubusercontent.com/chadsfatherlali/nuxt-async-data-firebase/master/assets/login4.png "login 4")
![alt text](https://raw.githubusercontent.com/chadsfatherlali/nuxt-async-data-firebase/master/assets/login5.png "login 5")
