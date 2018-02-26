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


router.post('/setSession', (req, res) => {
  req.session.authUser = req.body  

  res.json ({ ok: true })
  //res.status(401).json({ message: 'Bad credentials' })
})

router.post('/destroyedSession', (req, res) => {
  delete res.session.authUser

  res.json({ ok: true })
})

module.exports = {
  path: '/api',
  handler: router
}