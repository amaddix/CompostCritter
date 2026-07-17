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
 
const ITEM_FRAME_SIZE = 24; // must match items.png frame dimensions
 
function drawFallingItems(ctx) {
  for (const item of state.fallingItems) {
    const sx = item.spriteFrame * ITEM_FRAME_SIZE;
    ctx.drawImage(
      sprites.items,
      sx, 0, ITEM_FRAME_SIZE, ITEM_FRAME_SIZE,
      item.x, item.y, item.width, item.height
    );
  }
}
 
const PLAYER_FRAME_SIZE = 32; // must match the spritesheet's frame dimensions
 
function drawPlayer(ctx) {
  const p = state.player;
  const sheet = sprites.player;
 
  // source rect: which frame column to slice out of the sheet
  const sx = p.frameIndex * PLAYER_FRAME_SIZE;
  const sy = 0;
 
  ctx.save();
 
  if (p.facing === "left") {
    // Flip horizontally around the sprite's own center, since the art
    // is only drawn facing right. Translate to center, scale -1, draw
    // offset back — this avoids flipping the whole canvas.
    ctx.translate(p.x + p.width / 2, p.y + p.height / 2);
    ctx.scale(-1, 1);
    ctx.drawImage(
      sheet,
      sx, sy, PLAYER_FRAME_SIZE, PLAYER_FRAME_SIZE,
      -p.width / 2, -p.height / 2, p.width, p.height
    );
  } else {
    ctx.drawImage(
      sheet,
      sx, sy, PLAYER_FRAME_SIZE, PLAYER_FRAME_SIZE,
      p.x, p.y, p.width, p.height
    );
  }
 
  ctx.restore();
 
  // Carried item hovers above the head — clear visual feedback for
  // "hands are full, go deliver this before catching another"
  if (p.carrying) {
    const iconSize = 18;
    const sx2 = p.carrying.spriteFrame * ITEM_FRAME_SIZE;
    ctx.drawImage(
      sprites.items,
      sx2, 0, ITEM_FRAME_SIZE, ITEM_FRAME_SIZE,
      p.x + p.width / 2 - iconSize / 2, p.y - iconSize - 4, iconSize, iconSize
    );
  }
}
 
