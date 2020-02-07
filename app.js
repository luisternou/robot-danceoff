// Include JS Models
const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')

// Set up express-handlebars
app.engine('handlebars', exphbs({ default: 'main' }))
app.set('view engine', 'handlebars')

//Include routes

const homeRoutes = require('./routes/home')
const competitionRoutes = require('./routes/cometition')

// Server Port
const port = 3000

// add middle-parser middleware
app.use(bodyParser.urlencoded({ extended: true }))

// serve static files
app.use(express.static('public'))

app.use('/', homeRoutes)
app.use('/competition', competitionRoutes)

app.listen(process.env.PORT || port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})