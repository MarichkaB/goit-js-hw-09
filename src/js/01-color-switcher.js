const body = document.querySelector('body');
const start = document.querySelector('[data-start]');
const stop = document.querySelector('[data-stop]');
stop.disabled = true;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

let timerId = null;

start.addEventListener('click', () => {
  start.disabled = true;
  stop.disabled = false;

  timerId = setInterval(() => {
    body.style.background = getRandomHexColor();
  }, 1000);
});

stop.addEventListener('click', () => {
  start.disabled = false;
  stop.disabled = true;
  clearInterval(timerId);
});
