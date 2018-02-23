<template>
  <div class="container">
    <h1>Login</h1>
    <pre v-if="$store.state.authUser">--> Estas logado <--</pre>

    <form @submit.prevent="login">
      <input type="text" name="email" placeholder="email@example" v-model="formEmail" />
      <input type="password" name="password" placeholder="contraseña" v-model="formPassword" />

      <button type="submit">Login</button>
    </form>

    <p><nuxt-link to="/">Back to home page</nuxt-link></p>
  </div>
</template>

<script>
import { login, currentUser } from '../../custom_modules/firebase-instance.js';

export default {
  data () {
    return {
      formEmail: '',
      formPassword: ''
    }
  },
  methods: {
    async login () {
      await login(this.formEmail, this.formPassword);
      await this.$store.dispatch('login', {
        user: currentUser()
      });
    } 
  },
  head: {
    title: 'Login users'
  }
}
</script>

<style scoped>
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
