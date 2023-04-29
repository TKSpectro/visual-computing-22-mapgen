const { writeFileSync } = require("fs");
const convert = require("xml-js");

const map = require("./map-large.js");

const entities = [];

const TYPE = {
  CHARACTER: 0,
  GROUND: 1,
  OBSTACLE: 2,
  FINISH: 3,
  COIN: 4,
};

const data = (x, y, type) => {
  return {
    type: type,
    position: `${x * 64}.0;${y * 64}.0;0.0`,
    size: "64.0;64.0;64.0",
  };
};

const logic = (canMove, canCollide, isFinish) => {
  return {
    canMove: canMove,
    canCollide: canCollide,
    isFinish: isFinish,
  };
};

for (let y = 0; y < map.length; y++) {
  for (let x = 0; x < map[y].length; x++) {
    if (map[y][x] === 1) {
      entities.push({
        _attributes: {
          name: `wall_${x}_${y}`,
          "meta-entity": "ground_stone",
        },
        data: data(x, y, TYPE.GROUND),
        logic: logic(false, true, false),
      });
    }
    if (map[y][x] === 2) {
      entities.push({
        _attributes: {
          name: `ground_${x}_${y}`,
          "meta-entity": "dirt",
        },
        data: data(x, y, TYPE.GROUND),
        logic: logic(false, true, false),
      });
    }
    if (map[y][x] === 3) {
      entities.push({
        _attributes: {
          name: `finish_${x}_${y}`,
          "meta-entity": "finish",
        },
        data: data(x, y, TYPE.FINISH),
        logic: logic(false, true, true),
      });
    }
    if (map[y][x] === 4) {
      entities.push({
        _attributes: {
          name: `coin_${x}_${y}`,
          "meta-entity": "coin",
        },
        data: data(x, y, TYPE.COIN),
        logic: logic(false, true, false),
      });
    }
    if (map[y][x] === 9) {
      entities.push({
        _attributes: {
          name: `player`,
          "meta-entity": "player",
        },
        data: data(x, y, TYPE.CHARACTER),
        logic: logic(true, true, false),
      });
    }
  }
}

let xmlDataStr = convert.js2xml(
  { entities: { entity: entities } },
  {
    compact: true,
    ignoreComment: true,
    spaces: 2,
  }
);

writeFileSync("map.xml", xmlDataStr);
