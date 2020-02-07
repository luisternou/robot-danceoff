// Include modules
const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const handlebarHelpers = require('./handlebars-helpers')



// check if it's in production mode
if (process.env.NODE_ENV !== 'production') { require('dotenv').config() }



// Include controllers
const errorController = require('./controllers/error')

// Set up express-handlebars
app.engine('handlebars', exphbs({ default: 'main' }))
app.set('view engine', 'handlebars')

// Include routers
const homeRoutes = require('./routes/home')



// Set up server related variable
const port = 3000

// add middle-parser middleware
app.use(bodyParser.urlencoded({ extended: true }))


// serve static files
app.use(express.static('public'))

// home route
app.use('/', homeRoutes)


// error page
app.use(errorController.getError)

// Start and listen to server
app.listen(process.env.PORT || port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})