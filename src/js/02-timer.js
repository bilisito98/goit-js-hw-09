import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
require("../css/dark.css");

import Notiflix from 'notiflix';

import 'animate.css';

const animateObj = document.querySelectorAll('#animate');

const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');

const daysEle = document.querySelector('[data-days]');
const hoursEle = document.querySelector('[data-hours]');
const minutesEle = document.querySelector('[data-minutes]');
const secondsEle = document.querySelector('[data-seconds]');

let timerId = null;

animateObj.disabled = true;
startBtn.disabled = true;

function convertMs(ms) {

  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

const addLeadingZero = value => String(value).padStart(2, 0);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      Notiflix.Notify.failure('Por favor elige una fecha en el futuro');
      return;
    }
    startBtn.disabled = false;

    const showTimer = () => {
      const now = new Date();
      localStorage.setItem('selectedData', selectedDates[0]);
      const selectData = new Date(localStorage.getItem('selectedData'));

      if (!selectData) return;

      const diff = selectData - now;
      const { days, hours, minutes, seconds } = convertMs(diff);

        daysEle.textContent = days;
        hoursEle.textContent = addLeadingZero(hours);
        minutesEle.textContent = addLeadingZero(minutes);
        secondsEle.textContent = addLeadingZero(seconds);

      if (
        daysEle.textContent === '0' &&
        hoursEle.textContent === '00' &&
        minutesEle.textContent === '00' &&
        secondsEle.textContent === '00'
      ) {
        clearInterval(timerId);
      }
    };


    startBtn.addEventListener('click', () => {
        if (timerId) {
            clearInterval(timerId);
          }
          showTimer();
          timerId = setInterval(showTimer, 1000);

        for (let i = 0; i < animateObj.length; i++) {
            animateObj[i].classList.remove('easeani');
        }

    });
  },
};
stopBtn.addEventListener('click',() => {
    clearInterval(timerId);
    for (let i = 0; i < animateObj.length; i++) {
        animateObj[i].classList.add('easeani');
    }
});


flatpickr('#datetime-picker', { ...options });