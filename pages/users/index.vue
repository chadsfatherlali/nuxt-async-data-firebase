
<template>
  <div class="container">
    <h1>Users</h1>
    <ul>
      <li v-for="(user, index) in users" :key="index">
        <pre>
        	{{ user.nombre }} <strong>{{ index }}</strong>
        </pre>
      </li>
    </ul>
    <p><nuxt-link to="/">Back to home page</nuxt-link></p>
  </div>
</template>

<script>
import { consult } from '../../custom_modules/firebase-instance.js';

export default {
  asyncData({ app, req, params }) {
  	return consult('personas/').then(resposne => {
  		return {
  			users: resposne
  		}
  	})
  },
  head: {
    title: 'List of posts'
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
