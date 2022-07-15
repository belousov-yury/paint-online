const express = require('express')
const fs = require('fs')
const path = require('path')
const cors = require('cors')
const app = express()
const WSServer = require('express-ws')(app)
const aWss = WSServer.getWss()

const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

app.ws('/', (ws, req) => {
  console.log('CONNECT ON')
  ws.send('Connect success')
  ws.on('message', msg => {
    msg = JSON.parse(msg)
    switch (msg.method) {
      case 'connection':
        connectionHandler(ws, msg)
        break
      case 'draw':
        broadcastConnection(ws, msg)
        break
      case 'clear':
        broadcastConnection(ws, msg)
        break
    }
  })
})

app.post('/image', (req, res) => {
  try {
    const data = req.body.img.replace('data:image/png;base64,', '')
    fs.writeFileSync(path.resolve(__dirname, 'files', `${req.query.id}.png`), data, 'base64')
    return res.status(200).json('saved')
  } catch (e) {
    return res.status(500).json('error')
  }
})
app.get('/image', (req, res) => {
  try {
    const file = fs.readFileSync(path.resolve(__dirname, 'files', `${req.query.id}.png`))
    const data = 'data:image/png;base64,' + file.toString('base64')
    return res.status(200).json(data)
  } catch (e) {
    return res.status(500).json('error')
  }
})

app.listen(PORT, () => {
  console.log(`Server has been started on PORT ${PORT}`)
})

const connectionHandler = (ws, msg) => {
  ws.id = msg.id
  broadcastConnection(ws, msg)
}

const broadcastConnection = (ws, msg) => {
  console.log(msg)
  aWss.clients.forEach(client => {
    if (client.id === msg.id) {
      client.send(JSON.stringify(msg))
    }
  })
}