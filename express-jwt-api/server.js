const
  express = require('express'),
  app = express(),
  logger = require('morgan'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  usersRoutes = require('./routes/users.js'),
  todosRoutes = require('./routes/todos.js'),
  cors = require('cors'),
  mongoUrl = process.env.MONGO_URL || 'mongodb://localhost/react-todo-jwt',
  port = process.env.PORT || 3001

// connect to mongodb:
mongoose.connect(mongoUrl, (err) => {
  console.log(err || 'Connected to MongoDB.')
})

// log all incoming requests to the console:
app.use(logger('dev'))

// allow incoming ajax requests from other domains (including other localhost ports)
app.use(cors())

// interpret bodies of data that are included in requests:
app.use(bodyParser.json()) // interpret json bodies
app.use(bodyParser.urlencoded({extended: false})) // interpret form data

// server root route:
app.get('/', (req, res) => {
  res.json({message: "Server root. All API routes start with /api..."})
})

// apply all user routes here:
app.use('/api/users', usersRoutes)
app.use('/api/todos', todosRoutes)

// listen for incoming http requests:
app.listen(port, (err) => {
  console.log(err || `Server running on ${port}`)
})
