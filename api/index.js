/* Подключение маршрутов для работы с файлоами */
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')

// Create express instnace
const app = express()

// Require API routes
const users = require('./routes/users')
const news = require('./routes/news')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
// Import API Routes
app.use(users)
app.use(news)

// Export the server middleware
module.exports = {
  path: '/api',
  handler: app
}
