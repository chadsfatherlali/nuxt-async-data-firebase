<template>
  <div class="container">
    <h1>Login</h1>

    <form v-if="!$store.state.authUser" @submit.prevent="login">
      <input type="text" name="email" placeholder="email@example" v-model="formEmail" />
      <input type="password" name="password" placeholder="contraseña" v-model="formPassword" />

      <button type="submit">Login</button>

      <div id="error_login" v-if="errorLogin">
        <pre><strong>code: </strong> {{ errorLogin.code }}</pre>
        <pre><strong>message: </strong> {{ errorLogin.message }}</pre>
      </div>
    </form>

    <div v-else>
      <pre>{{ $store.state.authUser.email }}</pre>
      <div><nuxt-link to="/users">Now you can see our clients</nuxt-link></div>
      <br />
      <button @click="logout">Logout</button>
    </div>

    <p><nuxt-link to="/">Back to home page</nuxt-link></p>
  </div>
</template>

<script>
import { login, logout, currentUser } from '../../plugins/firebase/firebase-client.js'

export default {
  data () {
    return {
      formEmail: '',
      formPassword: '',
      errorLogin: false
    }
  },
  methods: {
    async login () {
      try {
        let loginStatus = await login(this.formEmail, this.formPassword)

        if (!loginStatus.error) {
          this.errorLogin = false
          
          await this.$store.dispatch('login', {
            user: currentUser()
          })        
        }

        else {
          this.errorLogin = loginStatus.data
        }
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
</script>

<style scoped>
#error_login {
  line-height: 1px;
}
.container {
  width: 70%;
  margin: auto;
  text-align: center;
  padding-top: 100px;
}
ul {
  list-style-type: none;
  padding: 0;
}
ul li {
  border: 1px #ddd solid;
  padding: 20px;
  text-align: left;
}
ul li a {
  color: gray;
}
p {
  font-size: 20px;
}
a {
  color: #41B883;
}
</style>
