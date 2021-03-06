import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const _753443f1 = () => import('../pages/posts/index.vue' /* webpackChunkName: "pages/posts/index" */).then(m => m.default || m)
const _b9325034 = () => import('../pages/users/index.vue' /* webpackChunkName: "pages/users/index" */).then(m => m.default || m)
const _6d0e7afd = () => import('../pages/users/login.vue' /* webpackChunkName: "pages/users/login" */).then(m => m.default || m)
const _ff96e2ce = () => import('../pages/posts/_id.vue' /* webpackChunkName: "pages/posts/_id" */).then(m => m.default || m)
const _49d40526 = () => import('../pages/index.vue' /* webpackChunkName: "pages/index" */).then(m => m.default || m)



if (process.client) {
  window.history.scrollRestoration = 'manual'
}
const scrollBehavior = function (to, from, savedPosition) {
  // if the returned position is falsy or an empty object,
  // will retain current scroll position.
  let position = false

  // if no children detected
  if (to.matched.length < 2) {
    // scroll to the top of the page
    position = { x: 0, y: 0 }
  } else if (to.matched.some((r) => r.components.default.options.scrollToTop)) {
    // if one of the children has scrollToTop option set to true
    position = { x: 0, y: 0 }
  }

  // savedPosition is only available for popstate navigations (back button)
  if (savedPosition) {
    position = savedPosition
  }

  return new Promise(resolve => {
    // wait for the out transition to complete (if necessary)
    window.$nuxt.$once('triggerScroll', () => {
      // coords will be used if no selector is provided,
      // or if the selector didn't match any element.
      if (to.hash && document.querySelector(to.hash)) {
        // scroll to anchor by returning the selector
        position = { selector: to.hash }
      }
      resolve(position)
    })
  })
}


export function createRouter () {
  return new Router({
    mode: 'history',
    base: '/',
    linkActiveClass: 'nuxt-link-active',
    linkExactActiveClass: 'nuxt-link-exact-active',
    scrollBehavior,
    routes: [
		{
			path: "/posts",
			component: _753443f1,
			name: "posts"
		},
		{
			path: "/users",
			component: _b9325034,
			name: "users"
		},
		{
			path: "/users/login",
			component: _6d0e7afd,
			name: "users-login"
		},
		{
			path: "/posts/:id",
			component: _ff96e2ce,
			name: "posts-id"
		},
		{
			path: "/",
			component: _49d40526,
			name: "index"
		}
    ],
    
    
    fallback: false
  })
}
