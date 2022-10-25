const {io} = require('../servers')
const Orb = require('./classes/Orb')
const PlayerConfig = require('./classes/PlayerConfig')
const PlayerData = require('./classes/PlayerData')
const Player = require('./classes/Player')

let orbs = []
let players = []
let settings = {
  defaultOrbs: 500,
  defaultSpeed: 6,
  defaultSize: 6,
  defaultZoom: 1.5,
  worldWidth: 500,
  worldHeight: 500
}

initGame()

// cut this 19.18
// setInterval(() => {
//   io.to('game').emit('tock', {
//     players
//   })
// }, 33)

io.sockets.on('connect', (socket) => {
  // created at 16.18
  let player
  // a player connected
  socket.on('init', (data) => {
    socket.join('game')
    // make a playerConfig object
    let playerConfig = new PlayerConfig(settings)
    let playerData = new PlayerData(data.playerName, settings)
    // changed at 16.18
    // let player = new Player(socket.id, playerConfig, playerData)
    player = new Player(socket.id, playerConfig, playerData)
    //inserted at 19.18
    setInterval(() => {
      io.to('game').emit('tock', {
        players,
        playerX: player.playerData.locX,
        playerY: player.playerData.locY,
      })
    }, 80)
    // send a message to every connected socket
    socket.emit('initReturn', {
      orbs
    })

    players.push(playerData)
  })

  // added 11.29
  socket.on('tick', (data) => {
    // console.log({data, speed: player.playerConfig.speed, xV: data.xVector, yV: data.yVector, player})
    // replaced from canvasStuff.js.js on 12.06
    speed = player.playerConfig.speed
    xV = player.playerConfig.xVector = data.xVector;
    yV = player.playerConfig.yVector = data.yVector;

    if((player.playerData.locX < 5 && player.playerData.xVector < 0) || (player.playerData.locX > 500) && (xV > 0)){
        player.playerData.locY -= speed * yV;
    }else if((player.playerData.locY < 5 && yV > 0) || (player.playerData.locY > 500) && (yV < 0)){
        player.playerData.locX += speed * xV;
    }else{
        player.playerData.locX += speed * xV;
        player.playerData.locY -= speed * yV;
    }    
  })
})

// this func runs at the beginning of a new game
function initGame() {
  for(let i = 0; i < settings.defaultOrbs; i += 1) {
    orbs.push(new Orb(settings))
  }
}

module.exports = io
