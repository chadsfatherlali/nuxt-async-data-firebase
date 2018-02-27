
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
import axios from 'axios'

export default {
  asyncData({ req, params }) {
  	return axios.get('/api/firebase/personas')
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
