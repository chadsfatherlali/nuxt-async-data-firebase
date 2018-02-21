
<template>
  <div class="container">
    <h1>Users</h1>
    <ul>
      <li v-for="(user, index) in users" :key="index">
        <pre>
        	{{ user.nombre }} {{ index }}
        </pre>
      </li>
    </ul>
    <p><nuxt-link to="/">Back to home page</nuxt-link></p>
  </div>
</template>

<script>
export default {
  asyncData({ app, req, params }) {
  	return app.db.consult('personas/')
  		.then(reponse => {
  			return { users: reponse }
  		});
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
