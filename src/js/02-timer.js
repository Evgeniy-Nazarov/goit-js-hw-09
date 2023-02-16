import flatpickr from "flatpickr";
import Notiflix from "notiflix";
import "flatpickr/dist/flatpickr.min.css";



const startBtn = document.querySelector("button[data-start]");
const inputEl = document.querySelector("#datetime-picker");
const spanDays = document.querySelector('span[data-days]');
const spanHours = document.querySelector('span[data-hours]');
const spanMinutes = document.querySelector('span[data-minutes]');
const spanSeconds = document.querySelector('span[data-seconds]');


let timerId = null;




const options = {
    enableTime: true,
    dateFormat: "Y-m-d H:i",
    defaultDate: new Date(),
    minDate: new Date(),
    onChange: function (selectedDates, dateStr, instance) {
        const selectedDate = inputEl.value;
        const ms = new Date(selectedDate) - Date.now();
        const convertedDate = convertMs(ms);
        spanDays.textContent = addLeadingZero(convertedDate.days);
        spanHours.textContent = addLeadingZero(convertedDate.hours);
        spanMinutes.textContent = addLeadingZero(convertedDate.minutes);
        spanSeconds.textContent = addLeadingZero(convertedDate.seconds);
    },
};

const datePicker = flatpickr(inputEl, options);
startBtn.addEventListener('click', onClick);


function onClick() {
    const selectedDate = inputEl.value;
    console.log(selectedDate);
    const ms = new Date(selectedDate) - Date.now();
    if (ms < 0) {
        Notiflix.Notify.failure('Please choose a date in the future');
        return;
    };
    if (timerId) {
        clearInterval(timerId);
        timerId = null;
        startBtn.textContent = 'Start';
        return;
    };
    
    startBtn.textContent = 'Stop';
    timerId = setInterval(() => {
        const ms = new Date(selectedDate) - Date.now();
        const convertedDate = convertMs(ms);
        spanDays.textContent = addLeadingZero(convertedDate.days);
        spanHours.textContent = addLeadingZero(convertedDate.hours);
        spanMinutes.textContent = addLeadingZero(convertedDate.minutes);
        spanSeconds.textContent = addLeadingZero(convertedDate.seconds);
        if (ms <= 0) {
            clearInterval(timerId);
            timerId = null;
            startBtn.textContent = 'Start';
            Notiflix.Notify.success('Timer is finished');
        };
    }, 1000);
};



function addLeadingZero(value) {
    if (value < 10) {
        return value.toString().padStart(2, "0");
    } else {
        return value.toString();
    };
};


function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
};

