import Piece from "./components/Piece.js";

const t0 = performance.now();
ReactDOM.render(
  React.createElement(Piece, { notation: document.getElementById("notation").textContent }),
  document.getElementById("render")
);
console.log(`${performance.now() - t0}ms`);