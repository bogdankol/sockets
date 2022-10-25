let socket = io.connect('http://localhost:8902')

function init() {
  draw()
  // console.log({orbs})
  socket.emit('init', {
    playerName: player.name
  })
}

socket.on('initReturn', (data) => {
  orbs = data.orbs
  // added 10.30
  setInterval(() => {
    socket.emit('tick', {
      xVector: player.xVector,
      yVector: player.yVector
    })
  }, 80)
})

socket.on('tock', data => {
  players = data.players,
  player.locX = data.playerX,
  player.locY = data.playerY
})
