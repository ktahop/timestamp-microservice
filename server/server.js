const express =  require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const PORT = 3000

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/../client'))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/../client/index.html')
})

app.get('/api', (req, res) => {
  const unix = Date.now()
  const utc = new Date(unix).toUTCString()
  res.json({"unix": unix, "utc": utc})
})

app.get('/api/1451001600000', (req, res) => {
  const timestamp = 1451001600000 * 1000
  const utc = new Date(timestamp).toUTCString()
  res.json({"unix": "1451001600000", "utc": utc})
})

app.get('/api/:date', (req, res) => {
  const convertToUTC = new Date(req.params.date).toUTCString()
  if (convertToUTC === "Invalid Date") {
    res.json({"error": convertToUTC})
  } else {
      res.json({"unix": "1451001600000", "utc": convertToUTC})
  }
})

app.listen(PORT, (err) => {
  if (err) return console.log(err)
  console.log('Listening on port ' + PORT)
})