// render.js
// The "frontend visuals" layer. Reads state, draws it. Never changes state.
// Right now it draws colored rectangles as placeholders — swap these
// drawImage() calls for your real spritesheet frames later without
// touching update.js, state.js, or input.js at all.
 
function render(ctx) {
  ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
 
  drawBins(ctx);
  drawFallingItems(ctx);
  drawPlayer(ctx);
 
  document.getElementById("score").textContent = state.score;
}
 
function drawBins(ctx) {
  for (const bin of state.bins) {
    ctx.fillStyle = bin.color;
    ctx.fillRect(bin.x, bin.y, bin.width, bin.height);
    ctx.fillStyle = "#e8e6d9";
    ctx.font = "12px monospace";
    ctx.save();
    ctx.translate(bin.x + bin.width / 2, GAME_HEIGHT / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.textAlign = "center";
    ctx.fillText(bin.type.toUpperCase(), 0, 0);
    ctx.restore();
  }
}
 
function drawFallingItems(ctx) {
  for (const item of state.fallingItems) {
    // PLACEHOLDER: replace with
    // ctx.drawImage(itemSpriteSheet, sx, sy, sw, sh, item.x, item.y, item.width, item.height);
    ctx.fillStyle = item.color;
    ctx.fillRect(item.x, item.y, item.width, item.height);
  }
}
 
function drawPlayer(ctx) {
  const p = state.player;
  // PLACEHOLDER: replace with
  // ctx.drawImage(playerSpriteSheet, frameX, 0, 32, 32, p.x, p.y, p.width, p.height);
  ctx.fillStyle = "#4caf50";
  ctx.fillRect(p.x, p.y, p.width, p.height);
}
