# visual-computing-mapgen

This is a helper script which can be used to generate xml maps for [visual-computing Game Engine](https://github.com/TKSpectro/visual-computing-22)

To use this just edit the files `map-small.js` or `map-large.js` and then run `npm start` (don't forget to run `npm i` before that)

```js
// The current type to value mappings are
const TYPE = {
    PLAYER: 0,
    WALL: 1,
    OBSTACLE: 2,
    FINISH: 3,
    MELON: 4,
};
```

There also is a [visual editor](https://codepen.io/tkspectro/full/YzJxNvY).

If you're finished painting a map just press F12 or open the developer console and then press to top most button. Then you can right click the log and press `copy object`. Now go to the map.js files and replace the complete array structure.
