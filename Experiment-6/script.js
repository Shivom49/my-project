const svgCanvas = document.getElementById("drawingCanvas");
let isDrawing = false;
let currentPath;

svgCanvas.addEventListener("mousedown", (e) => {
  isDrawing = true;
  const { x, y } = getMousePosition(e);
  currentPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
  currentPath.setAttribute("stroke", "black");
  currentPath.setAttribute("stroke-width", "2");
  currentPath.setAttribute("fill", "none");
  currentPath.setAttribute("d", `M${x},${y}`); // ✅ fixed with backticks
  svgCanvas.appendChild(currentPath);
});

svgCanvas.addEventListener("mousemove", (e) => {
  if (!isDrawing || !currentPath) return; // ✅ safety check
  const { x, y } = getMousePosition(e);
  const d = currentPath.getAttribute("d");
  currentPath.setAttribute("d", `${d} L${x},${y}`); // ✅ fixed with backticks
});

svgCanvas.addEventListener("mouseup", () => {
  isDrawing = false;
});

svgCanvas.addEventListener("mouseleave", () => {
  isDrawing = false;
});

// Helper: relative mouse position inside SVG
function getMousePosition(evt) {
  const rect = svgCanvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}
