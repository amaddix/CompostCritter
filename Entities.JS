
// entities.js
// Factory functions that create new objects to push into state.
// Keeping creation logic here (instead of inline in update.js) makes it
// easy to swap in real spritesheet data later without touching game logic.
 
function spawnFallingItem() {
  const def = ITEM_TYPES[Math.floor(Math.random() * ITEM_TYPES.length)];
  const width = 24;
  return {
    x: Math.random() * (GAME_WIDTH - 100 - width) + 80, // stay clear of bins
    y: -width,
    width,
    height: width,
    fallSpeed: 60 + Math.random() * 40,
    type: def.type,
    label: def.label,
    color: def.color,
    fact: def.fact,
  };
}
 
