import Piece from "./components/Piece.js";

const t0 = performance.now();
const notation = document.getElementById("notation");

ReactDOM.render(
  React.createElement(Piece, {
    notation: notation ? notation.textContent : null,
    lyricsHTML: document.getElementById("lyrics").innerHTML,
  }),
  document.getElementById("render")
);
console.log(`${performance.now() - t0}ms`);