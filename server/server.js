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
  const utc = new Date(1451001600000).toUTCString()
  res.json({"unix": 1451001600000, "utc": utc})
})

app.get('/api/:date', (req, res) => {
  const date = new Date(req.params.date)
  const utc = date.toUTCString()
  const unix = date.valueOf()
  if (date.toString() === "Invalid Date") {
    res.json({"error": "Invalid Date"})
  } else {
    res.json({"unix": unix, "utc": utc})
  }
})

app.listen(PORT, (err) => {
  if (err) return console.log(err)
  console.log('Listening on port ' + PORT)
})