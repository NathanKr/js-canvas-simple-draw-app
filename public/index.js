const elemCanvas = document.getElementById("drawing-board");
const elemToolbar = document.getElementById("toolbar");
const ctx = elemCanvas.getContext("2d");

const canvasOffsetX = elemCanvas.offsetLeft;
const canvasOffsetY = elemCanvas.offsetTop;

elemCanvas.width = window.innerWidth - canvasOffsetX;
elemCanvas.height = window.innerHeight - canvasOffsetY;

let isPainting = false;
let lineWidth = 5;
let startX;
let startY;

elemToolbar.addEventListener("click", (e) => {
  if (e.target.id === "clear") {
    ctx.clearRect(0, 0, elemCanvas.width, elemCanvas.height);
  }
});

elemToolbar.addEventListener("change", (e) => {
  if (e.target.id === "stroke") {
    ctx.strokeStyle = e.target.value;
  }

  if (e.target.id === "lineWidth") {
    lineWidth = e.target.value;
  }
});

const draw = (e) => {
  if (!isPainting) {
    return;
  }

  ctx.lineWidth = lineWidth;
  ctx.lineCap = "round"; // --- line end is round

  ctx.lineTo(e.clientX - canvasOffsetX, e.clientY);
  ctx.stroke();
};

elemCanvas.addEventListener("mousedown", (e) => {
  isPainting = true;
  startX = e.clientX;
  startY = e.clientY;
});

elemCanvas.addEventListener("mouseup", (e) => {
  isPainting = false;
  ctx.stroke();
  ctx.beginPath();
});

elemCanvas.addEventListener("mousemove", draw);
