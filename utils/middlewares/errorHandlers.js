const { config } = require('../../config')
const isRequestAjaxOrAjax = require('../isRequestAjaxOrApi')
const boom = require('boom')
const Sentry = require('@sentry/node')

Sentry.init({
  dsn: `https://${config.sentryDns}@o483911.ingest.sentry.io/${config.sentryId}`, tracesSampleRate: 1.0
})

function withErrorStack (err, stack) {
  if (config.dev) {
    return { ...err, stack }
  }
}

function logErrors (err, req, res, next) {
  Sentry.captureException(err)
  console.log(err.stack)
  next(err)
}

function wrapError (err, req, res, next) {
  if (!err.Boom) {
    next(boom.badImplementation(err))
  }
  next(err)
}

function clientErrorHandler (err, req, res, next) {
  const {
    output: { statusCode, payload }
  } = err

  // catch errors for AJAX request or if an error ocurs while streaming, could be req.xhr, but, we can use isRequestAjaxOrAjax.js
  if (isRequestAjaxOrAjax(req) || res.headersSent) {
    res.status(statusCode).json(withErrorStack(payload, err.stack))
  } else {
    next(err)
  }
}

function errorHandler (err, req, res, next) {
  // catch errors while streaming
  const {
    output: { statusCode, payload }
  } = err

  res.status(statusCode)
  res.render('error', withErrorStack(payload, err.stack))
}

module.exports = {
  logErrors,
  wrapError,
  clientErrorHandler,
  errorHandler
}
