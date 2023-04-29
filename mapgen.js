const { writeFileSync } = require("fs");
const convert = require("xml-js");

const mapFileNames = ["map-small", "map-large"];

const TYPE = {
    PLAYER: 0,
    WALL: 1,
    OBSTACLE: 2,
    FINISH: 3,
    MELON: 4,
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

mapFileNames.forEach((fileName) => {
    const map = require(`./${fileName}.js`);

    const entities = [];

    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            if (map[y][x] === 1) {
                entities.push({
                    _attributes: {
                        name: `wall_${x}_${y}`,
                        "meta-entity": "wall",
                    },
                    data: data(x, y, TYPE.WALL),
                    logic: logic(false, true, false),
                });
            }
            if (map[y][x] === 2) {
                entities.push({
                    _attributes: {
                        name: `obstacle_${x}_${y}`,
                        "meta-entity": "obstacle",
                    },
                    data: data(x, y, TYPE.OBSTACLE),
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
                        name: `melon_${x}_${y}`,
                        "meta-entity": "melon",
                    },
                    data: data(x, y, TYPE.MELON),
                    logic: logic(false, true, false),
                });
            }
            if (map[y][x] === 9) {
                entities.push({
                    _attributes: {
                        name: `player`,
                        "meta-entity": "player",
                    },
                    data: data(x, y, TYPE.PLAYER),
                    logic: logic(true, true, false),
                });
            }
        }
    }

    const xmlDataStr = convert.js2xml(
        { entities: { entity: entities } },
        {
            compact: true,
            ignoreComment: true,
            spaces: 2,
        }
    );

    writeFileSync(`${fileName}.xml`, xmlDataStr);
});
