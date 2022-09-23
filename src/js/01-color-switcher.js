const refs = {
  startBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
  body: document.querySelector('body'),
};

refs.startBtn.addEventListener('click', onStartBtn);
refs.stopBtn.addEventListener('click', onStopBtn);
let intervalId = null;

function onStartBtn(evt) {
  intervalId = setInterval(onBodyColorChange, 1000);
  refs.startBtn.disabled = true;
}
function onStopBtn(evt) {
  clearInterval(intervalId);
  refs.startBtn.disabled = false;
}

function onBodyColorChange() {
  refs.body.style.backgroundColor = getRandomHexColor();
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
