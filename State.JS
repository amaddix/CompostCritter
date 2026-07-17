// state.js
// This is the ONLY place game data lives. Update.js changes it,
// render.js reads it. Neither file should reach into the other's job.
 
const GAME_WIDTH = 480;
const GAME_HEIGHT = 320;
 
const state = {
  score: 0,
  player: {
    x: 220,
    y: 260,
    width: 32,
    height: 32,
    speed: 180, // pixels per second
    facing: "right",   // "left" or "right" — controls horizontal flip
    frameIndex: 0,     // which column of the spritesheet to draw
    frameTimer: 0,     // seconds accumulated toward next frame
    frameDuration: 0.12, // seconds per frame when moving (walk speed)
    frameCount: 4,     // total frames in the spritesheet
    isMoving: false,
    carrying: null,    // null, or the item object currently held overhead
  },
  bins: [
    { type: "compost", x: 20, y: 0, width: 60, height: 320, color: "#5a3a1e" },
    { type: "recycle", x: 400, y: 0, width: 60, height: 320, color: "#2f6fa8" },
  ],
  fallingItems: [], // each: { x, y, width, height, type, fallSpeed, label }
  spawnTimer: 0,
  spawnInterval: 1.4, // seconds between new items
  lastFact: "",
};
 
// Data-driven fact bank: this is where the "education" actually lives.
// Each item type carries the fact that gets shown when sorted correctly.
const ITEM_TYPES = [
  {
    type: "compost",
    label: "banana peel",
    spriteFrame: 0,
    fact: "Food scraps in landfills decompose without oxygen, producing methane — a greenhouse gas over 25x more potent than CO2 over 100 years.",
  },
  {
    type: "compost",
    label: "coffee grounds",
    spriteFrame: 1,
    fact: "Composted coffee grounds enrich soil with nitrogen instead of releasing methane in a landfill.",
  },
  {
    type: "recycle",
    label: "aluminum can",
    spriteFrame: 2,
    fact: "Recycling one aluminum can saves enough energy to power a TV for about 3 hours.",
  },
  {
    type: "recycle",
    label: "cardboard",
    spriteFrame: 3,
    fact: "Recycled cardboard uses about 75% less energy to produce than making it from raw materials.",
  },
];
 
