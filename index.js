const express = require('express')
const path = require('path')
const boom = require('boom')
const productsRouter = require('./routes/views/products')
const productsApiRouter = require('./routes/api/products')
const app = express()

const {
  logErrors,
  wrapError,
  clientErrorHandler,
  errorHandler
} = require('./utils/middlewares/errorHandlers')

const isRequestAjaxOrApi = require('./utils/isRequestAjaxOrApi')
app.use(express.json())

app.use('/static', express.static(path.join(__dirname, 'public')))

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use('/products', productsRouter)
app.use('/api/products', productsApiRouter)

app.use(function (req, res, next) {
  if (isRequestAjaxOrApi(req)) {
    const {
      output: { statusCode, payload }
    } = boom.notFound()

    res.status(statusCode).json(payload)
  }

  res.status(404).render('404')
})
// error handlers
app.use(logErrors)
app.use(wrapError)
app.use(clientErrorHandler)
app.use(errorHandler)

const server = app.listen(8080, function () {
  console.log(`Listening at port ${server.address().port}`)
})
