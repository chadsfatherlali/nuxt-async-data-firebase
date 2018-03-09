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
    '~/api/firebase-access-token',
    '~/api'
  ]
}