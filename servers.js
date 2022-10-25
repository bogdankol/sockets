const express = require('express')
const app = express()
const socketio = require('socket.io')

app.use(express.static(__dirname + '/public'))
const expressServer = app.listen(8902, () => {
  console.log('Server runs on 8902 port')
})

const io = socketio()
io.attach(expressServer, {
  cors: {
    origin: '*'
  }
})

io.sockets.on('connect', (socket) => {
  socket.on('disconnect', (data) => {

  })
})

module.exports = {
  app,
  io
}