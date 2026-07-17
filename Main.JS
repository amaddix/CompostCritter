// main.js
// This file's only job: get the canvas, and run the loop.
// It owns time-tracking (deltaTime) and calls update() then render()
// in that fixed order, every single frame.
 
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
ctx.imageSmoothingEnabled = false; // keep pixel art crisp, no blur on scale
 
let lastTime = 0;
 
function loop(timestamp) {
  const dt = (timestamp - lastTime) / 1000; // seconds since last frame
  lastTime = timestamp;
 
  // dt can spike huge on tab-switch; clamp so physics doesn't jump
  const safeDt = Math.min(dt, 0.05);
 
  update(safeDt);
  render(ctx);
 
  requestAnimationFrame(loop);
}
 
requestAnimationFrame(loop);
 
