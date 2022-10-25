
// ========================================================
// =====================DRAWING============================

player.locX = Math.floor(500*Math.random() + 10)
player.locY = Math.floor(500*Math.random() + 10)

function draw() {
  // context from uiStuff
  context.setTransform(1,0,0,1,0,0)

  // here we clean previous drawings
  context.clearRect(0,0,canvas.width,canvas.height)
  // attach camera to a player but camera in focused in centre - the canvas itself moves
  const camX = -player.locX + canvas.width/2
  const camY = -player.locY + canvas.height/2
  context.translate(camX, camY)

  players.forEach(p => {
    context.beginPath()
    context.fillStyle = p.color
    // args 1, 2 - x, y of the center of the arc
    // arg3 - radius
    // arg4 - where to start from 0 = 90 deg
    // arg5 - where to end till 7 = 90 deg
    context.arc(p.locX, p.locY, 10, 0, 7)
    context.fill()
    context.lineWidth = 3
    context.strokeStyle = 'rgb(0, 255, 0)'
    context.stroke()
  })

  // draw all orbs
  orbs.forEach(orb => {
    context.beginPath()
    context.fillStyle = orb.color
    context.arc(orb.locX, orb.locY, orb.radius, 0, 7)
    context.fill()

  })

  requestAnimationFrame(draw)
}

canvas.addEventListener('mousemove', (e) => {
  // console.log(e)
  const mousePosition = {
      x: e.clientX,
      y: e.clientY
  };
  const angleDeg = Math.atan2(mousePosition.y - (canvas.height/2), mousePosition.x - (canvas.width/2)) * 180 / Math.PI;
  if(angleDeg >= 0 && angleDeg < 90){
      xVector = 1 - (angleDeg/90);
      yVector = -(angleDeg/90);
  }else if(angleDeg >= 90 && angleDeg <= 180){
      xVector = -(angleDeg-90)/90;
      yVector = -(1 - ((angleDeg-90)/90));
  }else if(angleDeg >= -180 && angleDeg < -90){
      xVector = (angleDeg+90)/90;
      yVector = (1 + ((angleDeg+90)/90));
  }else if(angleDeg < 0 && angleDeg >= -90){
      xVector = (angleDeg+90)/90;
      yVector = (1 - ((angleDeg+90)/90));
  }

  player.xVector = xVector
  player.yVector = yVector
  console.log({xVector, yVector})

  // replaced to socketMain.js on 12.04
  // speed = 10
  // xV = xVector;
  // yV = yVector;

  // if((player.locX < 5 && player.xVector < 0) || (player.locX > 500) && (xV > 0)){
  //     player.locY -= speed * yV;
  // }else if((player.locY < 5 && yV > 0) || (player.locY > 500) && (yV < 0)){
  //     player.locX += speed * xV;
  // }else{
  //     player.locX += speed * xV;
  //     player.locY -= speed * yV;
  // }    
})