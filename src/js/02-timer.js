import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const start = document.querySelector('[data-start]');
const daysElem = document.querySelector('[data-days]');
const hoursElem = document.querySelector('[data-hours]');
const minutesElem = document.querySelector('[data-minutes]');
const secondsElem = document.querySelector('[data-seconds]');

start.disabled = true;
let timerId = null;
let setTime;

const flatPickr = flatpickr('input#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const currentTime = new Date().getTime();
    if (selectedDates[0].getTime() < currentTime) {
      Notiflix.Notify.failure('Please choose a date in the future 📅');
      start.disabled = true;
      return;
    }
    start.disabled = false;
    setTime = selectedDates[0].getTime();
    Notiflix.Notify.info('Push the Start button ▶️');
  },
});

start.addEventListener('click', btnStartClick);
function btnStartClick() {
  start.disabled = true;
  timerId = setInterval(timer, 1000);
  function timer() {
    let timeTimer = setTime - new Date().getTime();
    if (timeTimer <= 0) {
      Notiflix.Notify.success(`Time to rest! 🛋`);
      clearInterval(timerId);
      return;
    }
    conuterValue(convertMs(timeTimer));
  }
}

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

function addLeadingZero(value) {
  return value.padStart(2, '0');
}

function conuterValue({ days, hours, minutes, seconds }) {
  daysElem.textContent = addLeadingZero(String(days));
  hoursElem.textContent = addLeadingZero(String(hours));
  minutesElem.textContent = addLeadingZero(String(minutes));
  secondsElem.textContent = addLeadingZero(String(seconds));
}
