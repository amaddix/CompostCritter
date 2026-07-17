// update.js
// The "logic" layer. Every function here reads input + state and
// mutates state. NOTHING in this file touches the canvas or draws anything.
// That separation is what makes this "backend logic" swappable from
// "frontend visuals" — render.js could be rewritten entirely (say, to use
// real sprites instead of colored rects) and this file wouldn't change.
 
function update(dt) {
  movePlayer(dt);
  spawnItems(dt);
  moveFallingItems(dt);
  checkCatch();
  checkDeliver();
  removeOffscreenItems();
}
 
function movePlayer(dt) {
  const p = state.player;
  p.isMoving = false;
 
  if (keys.left) {
    p.x -= p.speed * dt;
    p.facing = "left";
    p.isMoving = true;
  }
  if (keys.right) {
    p.x += p.speed * dt;
    p.facing = "right";
    p.isMoving = true;
  }
 
  // clamp inside the full canvas — this now includes the bin zones,
  // since delivering requires actually standing inside a bin
  p.x = Math.max(0, Math.min(GAME_WIDTH - p.width, p.x));
 
  animatePlayer(p, dt);
}
 
function animatePlayer(p, dt) {
  if (!p.isMoving) {
    p.frameIndex = 0; // idle pose = first frame
    p.frameTimer = 0;
    return;
  }
 
  p.frameTimer += dt;
  if (p.frameTimer >= p.frameDuration) {
    p.frameTimer = 0;
    p.frameIndex = (p.frameIndex + 1) % p.frameCount;
  }
}
 
function spawnItems(dt) {
  state.spawnTimer += dt;
  if (state.spawnTimer >= state.spawnInterval) {
    state.spawnTimer = 0;
    state.fallingItems.push(spawnFallingItem());
  }
}
 
function moveFallingItems(dt) {
  for (const item of state.fallingItems) {
    item.y += item.fallSpeed * dt;
  }
}
 
// Step 1: catching. Only possible when hands are empty (not already
// carrying something) — this is what creates real time pressure.
function checkCatch() {
  const p = state.player;
  if (p.carrying) return; // already holding an item, can't catch another
 
  for (let i = state.fallingItems.length - 1; i >= 0; i--) {
    const item = state.fallingItems[i];
    if (!rectsOverlap(p, item)) continue;
 
    p.carrying = item;
    state.fallingItems.splice(i, 1);
    updateFactBox("Carrying: " + item.label + " — find the right bin!");
    break; // only catch one per frame
  }
}
 
// Step 2: delivering. Only relevant when carrying something, checked
// against the player's position at the bins, completely separately
// from the catch step above.
function checkDeliver() {
  const p = state.player;
  if (!p.carrying) return;
 
  const bin = state.bins.find((b) => rectsOverlap(p, b));
  if (!bin) return; // not standing at a bin yet, keep carrying
 
  if (bin.type === p.carrying.type) {
    state.score += 10;
    updateFactBox(p.carrying.fact);
  } else {
    state.score = Math.max(0, state.score - 5);
    updateFactBox("Wrong bin! That was " + p.carrying.label + " — try the other bin next time.");
  }
 
  p.carrying = null;
}
 
function rectsOverlap(a, b) {
  return (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  );
}
 
function removeOffscreenItems() {
  state.fallingItems = state.fallingItems.filter((item) => item.y < GAME_HEIGHT + 40);
}
 
function updateFactBox(text) {
  document.getElementById("fact-box").textContent = text;
}
 
 
