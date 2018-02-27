const firebase = require('./../plugins/firebase/firebase-server');
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

router.get('/firebase/:collection', (req, res) => {
  firebase.consult(req.params.collection).then(response => {
    res.json(response)
  })
  //firebasedb.database().ref(collection).once('value')
});

router.post('/setSession', (req, res) => {
  req.session.authUser = req.body  

  res.json ({ ok: true })
  //res.status(401).json({ message: 'Bad credentials' })
})

router.post('/destroySession', (req, res) => {
  delete req.session.authUser

  res.json({ ok: true })
})

module.exports = {
  path: '/api',
  handler: router
}