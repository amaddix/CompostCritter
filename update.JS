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
  checkCollisions();
  removeOffscreenItems();
}
 
function movePlayer(dt) {
  const p = state.player;
  if (keys.left) p.x -= p.speed * dt;
  if (keys.right) p.x += p.speed * dt;
 
  // clamp inside play area, leaving room for bins on both edges
  p.x = Math.max(80, Math.min(GAME_WIDTH - 80 - p.width, p.x));
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
 
function rectsOverlap(a, b) {
  return (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  );
}
 
function checkCollisions() {
  const p = state.player;
 
  for (let i = state.fallingItems.length - 1; i >= 0; i--) {
    const item = state.fallingItems[i];
    if (!rectsOverlap(p, item)) continue;
 
    // Player caught the item — now check which bin they're standing near.
    const bin = state.bins.find((b) => rectsOverlap(p, b));
 
    if (bin && bin.type === item.type) {
      state.score += 10;
      state.lastFact = item.fact;
      updateFactBox(item.fact);
    } else if (bin) {
      state.score = Math.max(0, state.score - 5);
      updateFactBox("Wrong bin! Try again — that was a " + item.label + ".");
    } else {
      // caught it but not standing at a bin yet; let it keep falling
      continue;
    }
 
    state.fallingItems.splice(i, 1);
  }
}
 
function removeOffscreenItems() {
  state.fallingItems = state.fallingItems.filter((item) => item.y < GAME_HEIGHT + 40);
}
 
function updateFactBox(text) {
  document.getElementById("fact-box").textContent = text;
}
 
