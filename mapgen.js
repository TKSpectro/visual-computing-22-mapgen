const { writeFileSync } = require("fs");
const convert = require("xml-js");

const map = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 9, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
];

const entities = [];

const data = (x, y) => {
  return {
    position: `${x * 64}.0;${y * 64}.0;0.0`,
    size: "64.0;64.0;64.0",
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
        data: data(x, y),
        logic: {
          canMove: "false",
          canCollide: "true",
        },
      });
    }
    if (map[y][x] === 2) {
      entities.push({
        _attributes: {
          name: `ground_${x}_${y}`,
          "meta-entity": "dirt",
        },
        data: data(x, y),
        logic: {
          canMove: "false",
          canCollide: "true",
        },
      });
    }
    if (map[y][x] === 9) {
      entities.push({
        _attributes: {
          name: `player`,
          "meta-entity": "player",
        },
        data: data(x, y),
        logic: {
          canMove: "true",
          canCollide: "false",
        },
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
