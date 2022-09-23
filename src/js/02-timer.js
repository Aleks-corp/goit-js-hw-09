import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  startBtn: document.querySelector('[data-start]'),
  inputField: document.querySelector('#datetime-picker'),
  timerContainerDays: document.querySelector('[data-days]'),
  timerContainerHours: document.querySelector('[data-hours]'),
  timerContainerMins: document.querySelector('[data-minutes]'),
  timerContainerSecs: document.querySelector('[data-seconds]'),
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    timeTo = selectedDates[0].getTime();
    if (timeTo > Date.now() && timer.TimerId === null) {
      refs.startBtn.disabled = false;
      Notify.success('Please click START');
    } else {
      refs.startBtn.disabled = true;
      Notify.warning('Please choose a date in the future');
    }
  },
};

const timer = {
  TimerId: null,
  start() {
    this.TimerId = setInterval(() => {
      const currentTime = Date.now();
      if (timeTo > currentTime) {
        updateDomTimerContainer(currentTime);
      } else {
        clearInterval(this.TimerId);
        this.TimerId = null;
        refs.inputField.disabled = false;
        Notify.success('Let start timer again)');
      }
    }, 1000);
  },
};

flatpickr(refs.inputField, options);
refs.startBtn.disabled = true;
let timeTo = null;

refs.startBtn.addEventListener('click', onInput);

function onInput(evt) {
  timer.start();
  refs.startBtn.disabled = true;
  refs.inputField.disabled = true;
}

function updateDomTimerContainer(currentTime) {
  const { days, hours, minutes, seconds } = convertMs(timeTo - currentTime);
  refs.timerContainerDays.textContent = days;
  refs.timerContainerHours.textContent = hours;
  refs.timerContainerMins.textContent = minutes;
  refs.timerContainerSecs.textContent = seconds;
}
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
