const buttonStart = document.querySelector('[data-start]');
const buttonStop = document.querySelector('[data-stop]');
const body = document.querySelector('body');

let timerId = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

const cambioColor = () => {
  timerId = setTimeout(() => {
    document.body.style.backgroundColor = getRandomHexColor();
    cambioColor();
  }, 1000)
  buttonStart.setAttribute('disabled', true);
  buttonStop.removeAttribute('disabled')
}

const pararColor = () => {
  clearTimeout(timerId)
  buttonStart.removeAttribute('disabled');
  buttonStop.setAttribute('disabled', true);
}

buttonStart.addEventListener('click', cambioColor);
buttonStop.addEventListener('click', pararColor);
