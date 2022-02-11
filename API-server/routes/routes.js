const experiencesRoutes = require('./experiences')

const appRouter = (app, fs) => {
  app.get('/', (req, res) => {
    res.send('You\'ve found the root of the server')
  })

  experiencesRoutes(app, fs)
}

module.exports = appRouter
